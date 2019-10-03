import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService } from 'src/app/services/fire.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/httpobjects/task';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent implements OnInit {

  constructor(private share: DataSharingService, private db: FireService, private route: ActivatedRoute) { }

  projectname: string;

  tasks: Task[] = [];
  open: Task[] = [];
  closed: Task[] = [];
  inprogress: Task[] = [];
  pending: Task[] = [];
  completed: Task[] = [];

  ngOnInit() {

      this.projectname = this.route.snapshot.params['project'];
      console.log('routersnapshot',this.projectname);
      
      this.share.getTasksPerProject(this.projectname).subscribe(data =>{

          this.tasks = data;

          this.open = this.tasks.filter(data => data.status == 'OPEN');
          this.inprogress = this.tasks.filter(data => data.status == 'INPROGRESS');
          this.pending = this.tasks.filter(data => data.status == 'PENDING');
          this.completed = this.tasks.filter(data => data.status == 'COMPLETED');
          this.closed = this.tasks.filter(data => data.status == 'CLOSED');

      });
  }

  drop(event: CdkDragDrop<string[]>, status: string, from: string, data: Task) {
    
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('data in out ',status);

      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log(event.previousContainer, 'and', from);
      
    }
  }

}
