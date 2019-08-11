import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from 'src/app/httpobjects/vendor';
import { VenodorService } from 'src/app/services/venodor.service';
import {MatTableDataSource, MatSnackBar} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { User } from 'src/app/httpobjects/user';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService } from 'src/app/services/fire.service';
import { Project } from 'src/app/httpobjects/project';
import { Task } from 'src/app/httpobjects/task';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  vendordataob: Observable<any[]>;
  vendordata: Vendor[];
  displaycolumns: string[] = ['name','email','mobile','address','pincode','pancard','service'];
  datasource: any;
  userform: FormGroup; projectForm: FormGroup; taskFrom: FormGroup

  roles: string[] = ['ADMIN','DEV','MANAGEMENT','FINANCE', 'TL'];
  wings: string[] = ['IT', 'MANAGEMENT', 'BD', 'ADMIN', 'MARKETING'];
  statuses: string[] = ['active', 'inactive', 'probation', 'internship', 'permanant'];
  currentUser: User;
  TLs: User[] = [];
  users: User[] = [];
  projects: Project[] =[];
  constructor(public vservice: VenodorService, private fb: FormBuilder,  private snackBar: MatSnackBar, private share: DataSharingService,
    private fireservice: FireService) {
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
      'commets':[null, Validators.required]
    })
   }

  managers: User[] = [];
  ngOnInit() {
    this.fireservice.getCollectionWithCondition<User>('users','role', '==','ADMIN').subscribe(res =>{      
      res.forEach(data =>{
        this.managers.push(data);
      })
    });
    this.fireservice.getCollectionWithCondition('users','role', 'array-contains','TL').subscribe(res =>{
      this.TLs = res;
    })
    this.fireservice.getCollection('users').subscribe(res =>{
      this.users = res;
    });
    this.fireservice.getCollection<Project>('projects').subscribe(res => this.projects = res);
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    //this.share.currentUser.subscribe(data => this.currentUser=data);
  }

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  register(form: User, formDirective: FormGroupDirective){

    this.fireservice.saveDocument<User>(form, 'users').subscribe(res =>{
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
    this.fireservice.saveDocument<Project>(form,'projects').subscribe(data=>{
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
    this.fireservice.saveDocument(form, 'tasks').subscribe(data =>{
      for(const key in this.projectForm.controls){
        this.taskFrom.get(key).clearValidators();
        this.taskFrom.get(key).updateValueAndValidity();
      }
      this.taskFrom.reset();
      this.snackBar.open('Project Added', data.title);
    },(error: any) =>{
      console.log(error);
      
      for(const key in this.projectForm.controls){
        this.taskFrom.get(key).clearValidators();
        this.taskFrom.get(key).updateValueAndValidity();
      }
      this.taskFrom.reset();
      this.snackBar.open('Exception Occured', error);
    })
  }
}
