import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './../../services/notification.service';
import { SpinnerService } from './../../services/spinner.service';
import { Notification } from './../../httpobjects/notification';
import { DBTableNames } from 'src/app/constants/constants';
import { User } from 'src/app/httpobjects/user';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService } from 'src/app/services/fire.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'view-all-notification',
  templateUrl: './view-all-notification.component.html',
  styleUrls: ['./view-all-notification.component.scss']
})
export class ViewAllNotificationComponent implements OnInit {

  currentuser: User;
  myNotifications: Notification[] = [];
  noNotificationbool: boolean= false;

  constructor(private route: Router, 
    private db: FireService,
    private share: DataSharingService,
    private spinner: SpinnerService,
    private snackbar : MatSnackBar,
    private notificationService: NotificationService) { 
      this.share.currentUser.subscribe(data =>{
        this.currentuser = data;
      })
    }

  ngOnInit() {
    let ref = this.spinner.open();

    this.db.getCollectionWithCondition(DBTableNames.notifications,
      'receiverId', 'array-contains', this.currentuser.id).subscribe(notifications =>{
        ref.close();
        if(notifications.length !== 0){
          this.noNotificationbool = false;
          this.myNotifications = this.sortBySendingDate(notifications).reverse();
        }else{
          this.noNotificationbool = true;
        }
      },err =>{
        this.noNotificationbool = true;
        this.notificationService.notify(this.snackbar,'कामं करावी लागतात नोटिफिकेशन यायला ..!!')
        ref.close();
      });

  }

  public sortBySendingDate(myArray: Notification[]): Notification[] {    
      return myArray.sort((a: Notification, b: Notification) => {
          return a.sendingDate.toDate() - b.sendingDate.toDate();
      });
  }
  redirect(data : Notification){
    this.route.navigate([data.redirectionURL]);
    //this.deleteNotification(data);
  }

  deleteNotification(notif: Notification){
    this.notificationService.deleteNotification(notif).subscribe(data=>{
      this.myNotifications.splice(this.myNotifications.indexOf(notif),1);
    }, err=>{
      console.log(err);
    });
  }

  deleteAll(){
    this.myNotifications.forEach(data =>{
      this.db.deleteDocument(data, DBTableNames.notifications).subscribe(tata =>{
        this.myNotifications.splice(this.myNotifications.findIndex(x=>x.id === data.id),1);
      }, err=>{
        this.notificationService.open({message:'Some Problem in Deleting Notification'});
      });
    });
    this.notificationService.open({message:'All Notifications Deleted Successfully'});
  }
}
