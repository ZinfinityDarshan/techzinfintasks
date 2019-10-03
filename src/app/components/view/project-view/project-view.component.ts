import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';
import { Project } from 'src/app/httpobjects/project';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  projects: Project[] = [];
  constructor(private db: FireService) { 
    this.db.getCollection<Project>('projects').subscribe(data =>{
      this.projects = data;
      new MatTableDataSource(this.projects);
    })
  }

  ngOnInit() {

  }

}
