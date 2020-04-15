import { Notification } from './../../httpobjects/notification';
import { User } from 'src/app/httpobjects/user';
import { DBTableNames } from 'src/app/constants/constants';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  currentuser: User;
  myNotifications: Notification[] = [];
  noNotificationbool: boolean= true;
  color = 'red'
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
  private thisref: MatSnackBarRef<NotificationComponent>,
  private route: Router) { 
    
  }
  thisRef = this.thisref;
  ngOnInit() {
  }

  navigate(url:string){
    this.route.navigate([url]);
  }
}
