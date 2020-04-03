import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';
import { Project } from 'src/app/httpobjects/project';

@Component({
  selector: 'project-list-cards',
  templateUrl: './project-list-cards.component.html',
  styleUrls: ['./project-list-cards.component.scss']
})
export class ProjectListCardsComponent implements OnInit {

  projects:Project[] = [];

  constructor(private db: FireService) {
    this.db.getCollection<Project>('projects').subscribe(data =>{
      this.projects = data;
    });
   }

  ngOnInit() {
  }

}
