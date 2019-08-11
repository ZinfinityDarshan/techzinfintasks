import { Component, OnInit } from '@angular/core';
import { faSearch, faBlenderPhone, faHeartbeat, faBriefcase, faUserAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch;
  blender = faBlenderPhone;
  heart = faHeartbeat;
  briefcase = faBriefcase;
  person = faUserAlt;

  constructor() { }

  ngOnInit() {
  }

}
