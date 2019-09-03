import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/httpobjects/task';

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {

  something: Task[];
  constructor(private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
  }

}
