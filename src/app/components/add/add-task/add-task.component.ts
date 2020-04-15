import { Project } from 'src/app/httpobjects/project';
import { User } from './../../../httpobjects/user';
import { Notification } from './../../../httpobjects/notification';
import { TaskStatus } from './../../../constants/constants';
import { TaskType, TaskPriority } from 'src/app/constants/constants';
import { Task } from './../../../httpobjects/task';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { VenodorService } from 'src/app/services/venodor.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { IdgeneratorService } from 'src/app/services/idgenerator.service';
import { Router } from '@angular/router';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import { FireService } from 'src/app/services/fire.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  taskFrom: FormGroup;
  TaskTypes: string[] = TaskType;
  TaskStatuses: string[] = TaskStatus;
  TLs: User[] = [];
  users: User[] = [];
  projects: Project[] =[];
  availableusers: User[] =[];
  managers: User[] = [];
  priorities: string[] = TaskPriority;

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    public vservice: VenodorService, private fb: FormBuilder,  private snackBar: MatSnackBar, private share: DataSharingService,
    private fireservice: FireService, private formhelper: FormHelperService, private router: Router, private idgen: IdgeneratorService,
    public dialog: MatDialog, private route: Router,
    private spin: SpinnerService,
    private notificationservice: NotificationService
  ) {
    this.taskFrom = fb.group({
      'title':[null, Validators.required],
      'assignee':[null, Validators.required],
      'completed':[null, Validators.required],
      'descp':[null, Validators.required],
      'owner':[null, Validators.required],
      'project':[null, Validators.required],
      'references':[null, Validators.required],
      'startdate':[null, Validators.required],
      'enddate':[null, Validators.required],
      'extensionDate':[null, Validators.required],
      'commets':[null, Validators.required],
      'priority':[null, Validators.required],
      'type':[null, Validators.required],
      'status':[null, Validators.required]
    })
  }

  ngOnInit() {
    this.loaddata();
  }

  description: string;
  onPaste(value){
    this.description = value;
  }

  spinner:boolean=false;

  loaddata(){
    this.share.getCommonData().subscribe(data =>{
      if(data.length == 0 || data == null || data === undefined){}
      else{
        this.users = data;
        this.snackBar.open('Data Refreshed Success ..!!', 'close', {duration : 1500});
        this.TLs = data.filter(res => res.role.includes('TL'));
        this.managers = data.filter(res => res.role.includes('ADMIN'));        
      }
    })
    this.fireservice.getCollection<Project>('projects').subscribe(res => this.projects = res);
  }

  addTask(form: Task){
    let ref = this.spin.open();
    form.startdate = firebase.firestore.Timestamp.fromDate(form.startdate.toDate());
    form.enddate = firebase.firestore.Timestamp.fromDate(form.enddate.toDate());
    form.descp = this.description;
    form.attachments = [];
    this.spinner = true;
    this.idgen.getNextId('tasks').subscribe(data =>{
      form.taskid = data;
      this.fireservice.saveDocument(form, 'tasks').subscribe(data =>{
        this.spinner = false;
        ref.close();
        let notif: Notification = {
          message:'New '+form.taskid+' is assigned to you ! ',
          receiverId: [form.assignee.id],
          sendingDate: new Date(),
          redirectionURL: '/profile'
        }
        this.notificationservice.openAndNotify(notif).subscribe(data =>{}, err=>{console.log(err);
        });
        this.dialogRef.close();
        this.formhelper.removeValidators(this.taskFrom);
        this.snackBar.open('Task Added', data.taskid);
        this.route.navigate(['/task/', data.taskid]);
      },(error: any) =>{
        this.taskFrom.reset();
        this.snackBar.open('Exception Occured', error);
      });
    },
    (error: any) =>{
      console.log('error generating id', error);
    }
    );
  }


}
