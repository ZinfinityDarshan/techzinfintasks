import { Observable } from 'rxjs';
import { FireService } from './fire.service';
import { Notification } from './../httpobjects/notification';
import { NotificationComponent } from './../components/notification/notification.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { DBTableNames } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar, private db: FireService) { }

  config: MatSnackBarConfig = {
    politeness:'polite'
  }
  public openAndNotify(tect: Notification): Observable<Notification>{
    return new Observable((obs)=>{
      this.db.saveDocument(tect,DBTableNames.notifications).subscribe(data =>{
        obs.next(data);
        obs.complete();
      }, err =>{this.snackbar.open('Notification Service failed','close', {duration:2000})
        obs.error(err);
        obs.complete();
      });  
    });
  }

  public open(tect: Notification) {
    this.snackbar.openFromComponent(NotificationComponent,{
      data:tect.message,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration:2500
    });
  }

  public deleteNotification(tect: Notification) : Observable<boolean>{
    return new Observable((obs)=>{
      this.db.deleteDocument(tect,DBTableNames.notifications).subscribe(data =>{
        
        this.snackbar.openFromComponent(NotificationComponent,{
          data:'Notification Removed Successfully',
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          duration:2500
        });
        obs.next(true);
        obs.complete();
      }, err =>{this.snackbar.open('Notification Service failed','close', {duration:2000});
      obs.next(false);
      obs.complete();
      })  
    });
  }

  public notify(snackbar:MatSnackBar, text: string){
    snackbar.openFromComponent(NotificationComponent,{
      data:text,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration:2500
    })
  }
}
