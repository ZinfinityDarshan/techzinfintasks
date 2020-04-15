import { Component, OnChanges, OnInit } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataSharingService } from './services/data-sharing.service';
import { User } from './httpobjects/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, OnInit{

  constructor(public router: Router, public share: DataSharingService){
    if(localStorage.getItem('user') !== null || undefined){      
      this.share.changeUser(JSON.parse(localStorage.getItem('user')));
    }
  }


  title = 'taskzinfi';

  public navVar:boolean = false;
  public icon = faBars;
  loggedin:boolean = false;
  currentuser: User;
  userObservable: Observable<User> = this.share.currentUser;

  ngOnInit(){
    this.share.getUsersFromDatabase().subscribe(data =>{
      this.share.getCommonData();
    });
    this.share.LoggedInObserve().subscribe(data =>{
      this.loggedin = true;
    });
    this.share.LoggedIn.subscribe(data =>{
      if(data)
      this.loggedin = data;
    });
  }

  togglenav() {
    if(this.navVar) {
      this.navVar = false;
      this.icon = faBars;
    } else {
      this.navVar = true;
      this.icon = faTimes;
    }
  }
  ngOnChanges(){
    if(localStorage.getItem('beduk')!=null){
      this.loggedin = true;
    }
    this.userObservable.subscribe(data => this.currentuser = data);
  }
  
  logout(){
    this.router.navigate([''])
    localStorage.setItem('beduk', '');
    this.share.changeUser(null);
    this.loggedin = false;
    this.currentuser = null;
    localStorage.clear();
  }

}
