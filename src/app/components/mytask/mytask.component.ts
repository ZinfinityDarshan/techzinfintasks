import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService, FBWhere } from 'src/app/services/fire.service';
import { Task } from 'src/app/httpobjects/task';
import { User } from 'src/app/httpobjects/user';
import { MatSnackBar } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.scss']
})
export class MytaskComponent implements OnInit {

  mytasks: Task[];
  filtertasks: Task[];
  currentuser: User;
  spinner: boolean=false;
  completedTasks: Task[] = [];
  completedTaskLabel: string;

  displayedColumns = ['id', 'title', 'assignee', 'owner', 'status', 'enddate'];
  dataSource: any;

  constructor(private share: DataSharingService, private db: FireService, private snackBar: MatSnackBar, private route: Router) { 
    this.completedTaskLabel = 'commpleted'
  }

  ngOnInit() {
    this.share.getCurrentUser().subscribe(data =>{
      this.currentuser = data;
    });
    this.getTasks();
  }

  getTasks(){
    this.db.getCollectionWithCondition<Task>('tasks','assignee.id','==',this.currentuser.id ).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.completedTasks = data.filter(res => res.status == 'COMPLETED');
      this.mytasks = data.filter(res => res.status !== 'COMPLETED').filter(res => res. status !== 'CLOSED');
      this.filtertasks = this.mytasks;      
    });
  }


  filterOption(option:string){
    switch (option) {
      case 'TASK':
        this.filtertasks = this.mytasks.filter(data => data.type === 'TASK')
        break;
      case 'DEV':
        this.filtertasks = this.mytasks.filter(data => data.type === 'DEV')
        break;
      case 'SUPPORT':
        this.filtertasks = this.mytasks.filter(data => data.type === 'SUPPORT')
        break;
      case 'PRODUCTION':
        this.filtertasks = this.mytasks.filter(data => data.type === 'PRODUCTION')
        break;
      case 'ISSUE':
        this.filtertasks = this.mytasks.filter(data => data.type === 'ISSUE')
        break;
      case 'CHANGE':
        this.filtertasks = this.mytasks.filter(data => data.type === 'CHANGE')
        break;
      default:
        this.filtertasks = this.mytasks;
        break;
    }
  }

  opneTask(id: string){
    this.route.navigate([''])
  }
  applyFilter(filterValue: string) {
    console.log('filterValue', filterValue);
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // filterPriority(option:string){
  //   switch (option) {
  //     case 'HIGH':
  //       this.filtertasks = this.mytasks.filter(data => data.priority.includes('HIGH'))
  //       break;
  //     case 'MEDIUM':
  //       this.filtertasks = this.mytasks.filter(data => data.priority.includes('MEDIUM'))
  //         break;
  //     case 'LOW':
  //       this.filtertasks = this.mytasks.filter(data => data.priority.includes('LOW'))
  //         break;
    
  //     default:
  //       break;
  //   }
  // }

  startTask(task: Task){
    this.spinner = true;
    task.status = 'INPROGRESS'
    this.db.updateDocument(task,'tasks').subscribe(data =>{
      this.getTasks();
      this.spinner = false;
      this.snackBar.open('Task is in progress', 'close', {duration : 1500});
    },error =>{
      console.log(error);
    })
  }

  statusFlag: boolean = false;
  changeStatus(){
    this.statusFlag = !this.statusFlag;
    if(this.statusFlag == true){this.completedTaskLabel ==='Revert'}else{this.completedTaskLabel === 'completed'}
    console.log(this.statusFlag);
    
  }
}
