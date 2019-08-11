import { Component, OnChanges } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { logging } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges{

  constructor(public router: Router){}


  title = 'taskzinfi';

  public navVar:boolean = false;
  public icon = faBars;
  loggedin:boolean = false;
  togglenav() {
    if(this.navVar) {
      this.navVar = false;
      this.icon = faBars;
      console.log('clicked');
    } else {
      this.navVar = true;
      this.icon = faTimes;
      console.log('clicked');
    }
  }
  ngOnChanges(){
    if(localStorage.getItem('beduk')!=null){
      this.loggedin = true;
    }
  }
  logout(){
    this.router.navigate([''])
    console.log("logging out");
    localStorage.clear();
  }
  
}
