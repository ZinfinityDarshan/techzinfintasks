import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService } from 'src/app/services/fire.service';
import { ActivatedRoute, RouterStateSnapshot, RouterEvent } from '@angular/router';
import { Task } from 'src/app/httpobjects/task';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NotificationService } from 'src/app/services/notification.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent implements OnInit {

  constructor(private share: DataSharingService, 
    private db: FireService, 
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private notify: NotificationService,
    private snackbar: MatSnackBar,
    private location: Location) { }

  projectname: string;

  tasks: Task[] = [];
  open: Task[] = [];
  closed: Task[] = [];
  inprogress: Task[] = [];
  pending: Task[] = [];
  completed: Task[] = [];

  warn: string = "warn";
  primary : string = "primary";
  accent : string = "accent";

  ngOnInit() {
      let ref = this.spinner.open();
      this.projectname = this.route.snapshot.params['project'];
      this.share.getTasksPerProject(this.projectname).subscribe(data =>{

        if(data.length !== 0){
          this.tasks = data;
          
          this.open = this.tasks.filter(data => data.status == 'OPEN');
          this.inprogress = this.tasks.filter(data => data.status == 'INPROGRESS');
          this.pending = this.tasks.filter(data => data.status == 'PENDING');
          this.completed = this.tasks.filter(data => data.status == 'COMPLETED');
          this.closed = this.tasks.filter(data => data.status == 'CLOSED');
          ref.close();
        }else{
          ref.close();
          this.notify.notify(this.snackbar, 'No Tasks added to this board')
        }
      }, err =>{
        ref.close();
        this.notify.notify(this.snackbar, 'No Tasks added to this board')
        this.location.back();
      });
  }

  back(){
    this.location.back()
  }


  drop(event: CdkDragDrop<string[]>, status: string, from: string) {
    
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      // console.log('data in out ',data);

      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      // console.log(event.previousContainer, 'and', from);
      
    }
  }

}
