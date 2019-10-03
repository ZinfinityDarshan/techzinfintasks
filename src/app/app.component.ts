import { Component, OnChanges, OnInit } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataSharingService } from './services/data-sharing.service';
import { User } from './httpobjects/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, OnInit{

  constructor(public router: Router, public share: DataSharingService){}


  title = 'taskzinfi';

  public navVar:boolean = false;
  public icon = faBars;
  loggedin:boolean = false;
  currentuser: User;

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
    // this.share.getCurrentUser().subscribe(data =>{
    //   if(data!=null || data!=undefined){
    //     this.currentuser = data;
    //   }
    // })
  }
  logout(){
    this.router.navigate([''])
    this.loggedin = false;
    console.log("logging out");
    localStorage.clear();
  }

}
