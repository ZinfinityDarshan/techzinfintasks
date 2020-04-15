import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/httpobjects/user';
import { VenodorService } from 'src/app/services/venodor.service';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material';
import { DataSharingService } from 'src/app/services/data-sharing.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  user: Observable<User[]>;
  loginfailbool: boolean;
  currentUser: User;

  @Output() currentUserEvent = new  EventEmitter();

  constructor( public fb: FormBuilder, public router: Router,
     public vservice: VenodorService, private snackBar: MatSnackBar, private share: DataSharingService) { 
    this.loginform = fb.group({
      'username':[null, Validators.required],
      'password':[null, Validators.required]
    })
  }

  ngOnInit() {
   this.share.currentUser.subscribe(data =>{
    data != null ? this.currentUserEvent.emit(data) : 
    this.snackBar.open('Please Login', 'close', {duration:2000});
    this.currentUser = data;
   });
  }

  login(form: User){
   this.vservice.login(btoa(form.username+form.password)).
   valueChanges().subscribe((users: User[]) => {
    if(users.length == 0){
        this.loginform.reset();
        this.openSnackBar('Login Failed', 'Ask for Admin Registration');
        this.loginfailbool = true;
    }
    users.forEach((user: User) =>{
      if(user.token!=null){
        user.password = '';
        localStorage.setItem('user',JSON.stringify(user));        
        this.share.changeUser(user);
        this.share.setLoggedIn(true);
        this.loginform.reset();
        this.currentUserEvent.emit(user)
        this.openSnackBar('Login Successfull',user.username);
        localStorage.setItem('beduk',user.token);
        this.router.navigate(['dash/mytask']);
      } 
    })
   });
    
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
}
