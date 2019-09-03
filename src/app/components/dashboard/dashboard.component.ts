import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/httpobjects/user';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  position: TooltipPosition = 'right';
  constructor(private share: DataSharingService) { 

    share.getCurrentUser().subscribe(data =>{
      this.currentUser = data;
    });
  }

  ngOnInit() {

  }

}
