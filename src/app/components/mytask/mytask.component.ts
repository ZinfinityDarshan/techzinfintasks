import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService, FBWhere } from 'src/app/services/fire.service';
import { Task } from 'src/app/httpobjects/task';
import { User } from 'src/app/httpobjects/user';
import { MatSnackBar, MatSort } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';


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
  taskId = new FormControl();
  taskBool: boolean = true;
  displayedColumns = ['id', 'title', 'assignee', 'owner', 'status', 'enddate', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Task>([{id:'TASK-01',title:'some', assignee:{name:'darshan'}, owner:{name:'redkar'},status:'prog',enddate:moment(), priority:'HIGH' }]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
  //   this.dataSource.sort = sort;
  // }
  constructor(private share: DataSharingService, private db: FireService, 
    private snackBar: MatSnackBar, private route: Router) { 
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
      this.dataSource.sort = this.sort;
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
  
  applyFilter(filterValue: string) {    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToTask(value: any){
    value = value.toUpperCase();
    this.route.navigate(['/task/', value]);
    
  }

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

  changeTaskBool(value: boolean){
    this.taskBool = value
  }
}
