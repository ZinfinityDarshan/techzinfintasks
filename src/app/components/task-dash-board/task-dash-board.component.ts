import { User } from './../../httpobjects/user';
import { Comment } from 'src/app/httpobjects/comment';
import { Project } from './../../httpobjects/project';
import { Observable, BehaviorSubject } from 'rxjs';
import { DBTableNames, TaskStatusEnum } from './../../constants/constants';
import { SpinnerService } from './../../services/spinner.service';
import { FireStorageService } from './../../services/fire-storage.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatAccordion, MatDialogRef } from '@angular/material';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';
import { Task } from 'src/app/httpobjects/task';
import { SpinnerComponent } from '../common/spinner/spinner.component';
import {Location} from '@angular/common';
import { buildIsoString } from '@fullcalendar/core/datelib/formatting';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-task-dash-board',
  templateUrl: './task-dash-board.component.html',
  styleUrls: ['./task-dash-board.component.scss']
})
export class TaskDashBoardComponent implements OnInit {

  dataSource = new MatTableDataSource<Task>();
  constructor(private db: FireService, 
    private snackBar: MatSnackBar, private route: Router,
    private storage: FireStorageService,
    private spin: SpinnerService,
    private location: Location) {
      this.getTasks().subscribe(data =>{
        this.spiner = this.spin.open();
        this.allTasks = data;
        this.getAllProjects().subscribe((test:Project[]) =>{
          test.forEach(project =>{        
            let tabledata = this.allTasks.filter(task => task.project.id === project.id);          
            this.tableInstancesMap.set(project.name,new MatTableDataSource<Task>(tabledata));
          });
          this.tableInstancesMapSource.next(this.tableInstancesMap);
          // this.tableInstances = this.tableInstances.filter(instance =>instance.data.length > 0); 
          this.spiner.close(); 
        }, err =>{
          console.log(err); 
        });
      }, err =>{
        console.log(err); 
      });
  }

  displayedColumns = ['id', 'title','assignee', 'owner', 'status', 'enddate', 'edit', 'delete'];
  allTasks: Task[] = [];
  spiner: MatDialogRef<SpinnerComponent>;

  ngOnInit() {


  }

  // @ViewChild('accordion',{static:true}) accordion: MatAccordion

  getTasks(): Observable<Task[]>{
    return new Observable((obs) =>{
      this.db.getCollection(DBTableNames.tasks).subscribe((data:Task[]) =>{
        let tab = data.filter(t => t.status != TaskStatusEnum.CLOSED);
        obs.next(tab);
        obs.complete();
      }, err =>{
        console.log(err);
      });
    });
  }
  
  getAllProjects(){
    return new Observable((obs) =>{
      this.db.getCollectionWithCondition(DBTableNames.projects,'active','==',true).subscribe((data: Project[]) =>{ 
        obs.next(data);
        obs.complete();
      }, err =>{
        obs.error(err);
        obs.complete();
      });    
    });
  }

  [key:string]:any;
  tableInstances: MatTableDataSource<Task>[] = [];

  tableInstancesMap = new Map();

  tableInstancesMapSource = new BehaviorSubject(new Map());
  tableInstancesMapObs= this.tableInstancesMapSource.asObservable();

  createTableInstance(projectID: string, data: any[]){
      this.tableInstancesMap.set(projectID,this['datasource-'+projectID] 
      = new MatTableDataSource<Task>(data));

      // this.tableInstances.forEach(dd => {dd.data})
  }

  deleteTask(task: Task){
    let ref = this.spin.open();    
    task.attachments.forEach(attachement =>{
      this.storage.deletePic(attachement.url).subscribe(data =>{
        
        this.snackBar.open('Document ** '+attachement.file+' ** deleted successfully', 'close', {duration:500})        
      }, err =>{
        console.error(err);
      })
    });
    this.db.deleteDocument(task,DBTableNames.tasks).subscribe(tata =>{
      this.snackBar.open('task deleted successfully', 'close', {duration:1100})
    }, err =>{
      console.error(err);
    });
    this.db.getCollectionWithCondition<Comment>
    (DBTableNames.comments,'taskid','==',task.taskid )
    .subscribe((data: Comment[]) =>{
      data.forEach(comment =>{
        this.db.deleteDocument(comment, DBTableNames.comments).subscribe(data =>{
          this.snackBar.open('Comment deleted Successfully','close',{duration:500})
        }, err =>{
          console.error(err);
        });
      }, err =>{
        console.error(err);
      })
    });
    ref.close();
    }

}
export class TaskDataSource extends DataSource<any> {
  constructor(private db: FireService) {
    super();
  }
  connect(): Observable<Task[]> {
    return;
  }
  disconnect() {}
}