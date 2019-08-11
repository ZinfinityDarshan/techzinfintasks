import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/httpobjects/user';
import { VenodorService } from 'src/app/services/venodor.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
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
  constructor( public fb: FormBuilder, public router: Router,
     public vservice: VenodorService, private snackBar: MatSnackBar, private share: DataSharingService) { 
    this.loginform = fb.group({
      'username':[null, Validators.required],
      'password':[null, Validators.required]
    })
  }

  ngOnInit() {
   console.log(btoa("adminadmin"));
   this.share.currentUser.subscribe(data =>{
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
        console.log('User Object on',JSON.stringify(user));
        localStorage.setItem('user',JSON.stringify(user));
        this.share.changeUser(user);
        this.loginform.reset();
        this.openSnackBar('Login Successfull',user.username);
        localStorage.setItem('beduk',user.token);
        this.router.navigate(['admin']);
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
