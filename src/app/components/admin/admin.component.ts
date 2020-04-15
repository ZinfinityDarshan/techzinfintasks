import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from 'src/app/httpobjects/vendor';
import { VenodorService } from 'src/app/services/venodor.service';
import {MatTableDataSource, MatSnackBar, MatFormFieldDefaultOptions, SimpleSnackBar} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { User } from 'src/app/httpobjects/user';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService } from 'src/app/services/fire.service';
import { Project } from 'src/app/httpobjects/project';
import { Task } from 'src/app/httpobjects/task';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { TaskPriority, Roles, Wings, Statuses, TaskType, TaskStatus } from 'src/app/constants/constants';
import { format } from 'url';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import { Router } from '@angular/router';
import { IdgeneratorService } from 'src/app/services/idgenerator.service';
import * as firebase from 'firebase/app';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Contact } from 'src/app/httpobjects/contact';
import { AddContactComponent } from './addcontact/add-contact-component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/httpobjects/notification';

// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';
// const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers:[
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class AdminComponent implements OnInit {

  spinner:boolean=false;
  vendordataob: Observable<any[]>;
  vendordata: Vendor[];
  displaycolumns: string[] = ['name','email','mobile','address','pincode','pancard','service'];
  datasource: any;
  userform: FormGroup; projectForm: FormGroup; taskFrom: FormGroup

  roles: string[] = Roles;
  wings: string[] = Wings;
  statuses: string[] = Statuses;
  priorities: string[] = TaskPriority;
  currentUser = this.share.currentUser;
  TLs: User[] = [];
  users: User[] = [];
  projects: Project[] =[];
  availableusers: User[] =[];
  managers: User[] = [];
  viewdataflag: boolean = false;
  TaskTypes: string[] = TaskType;
  TaskStatuses: string[] = TaskStatus;

  ngOnInit() {    
    this.loaddata();
  }

  loaddata(){
    this.viewdataflag = false;
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

  constructor(public vservice: VenodorService, private fb: FormBuilder,  private snackBar: MatSnackBar, private share: DataSharingService,
    private fireservice: FireService, private formhelper: FormHelperService, private router: Router, private idgen: IdgeneratorService,
    public dialog: MatDialog, private route: Router,
    private spin: SpinnerService,
    private notificationservice: NotificationService) {


    this.userform = fb.group({
      'username':[null, Validators.required],
      'password':[null, Validators.required],
      'email':[null, Validators.required],
      'role':[null, Validators.required],
      'wing':[null, Validators.required],
      'manager': [null],
      'status': [null],
      'name': [null]
    });
    this.projectForm = fb.group({
      'name':[null, Validators.required],
      'cost':[null, Validators.required],
      'client':[null, Validators.required],
      'lead': [null, Validators.required],
      'manager': [null, Validators.required]
    }),
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

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  register(form: User, formDirective: FormGroupDirective){
    let ref = this.spin.open();
    this.spinner = true;
    this.fireservice.saveDocument<User>(form, 'users').subscribe((res:User) =>{
      this.spinner=false;
      let notif: Notification = {
        message:'You have beed added to Znfinity Space, Welcome ! please update your '+
        'profile picture ',
        receiverId: [res.id],
        sendingDate: new Date(),
        redirectionURL: '/profile'
      }
      this.notificationservice.openAndNotify(notif).subscribe(data =>{}, err=>{console.log(err);
      });
      ref.close();
      for(const key in this.userform.controls){
        this.userform.get(key).clearValidators();
        this.userform.get(key).updateValueAndValidity();
      }
      this.userform.reset();
      this.snackBar.open('Registration Successfull', form.username);
    },error => {
      console.log(error);
    })
    form.token =  btoa(form.username+form.password);
  }

  addProject(form: Project){
    let ref = this.spin.open();
    this.spinner =false;
    this.fireservice.saveDocument<Project>(form,'projects').subscribe(data=>{
      this.spinner = true;
      ref.close();
      for(const key in this.projectForm.controls){
        this.projectForm.get(key).clearValidators();
        this.projectForm.get(key).updateValueAndValidity();
      }
      this.projectForm.reset();
      this.snackBar.open('Project Added', data.name);

    }, (error: any) =>{
      for(const key in this.projectForm.controls){
        this.projectForm.get(key).clearValidators();
        this.projectForm.get(key).updateValueAndValidity();
      }
      this.projectForm.reset();
      this.snackBar.open('Exception Occured', error);
    });
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

  loadviewdata(){
    this.viewdataflag = true;
    this.router.navigate(['admin/views']);
  }
  
  description: string;
  onPaste(value){
    this.description = value;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  openAddContactDialog(): void {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '800px',
      data: {name: 'beduk', animal: 'darrav'}
    });
  }

}
