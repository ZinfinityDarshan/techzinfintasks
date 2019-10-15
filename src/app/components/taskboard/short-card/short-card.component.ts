import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/httpobjects/task';

@Component({
  selector: 'short-card',
  templateUrl: './short-card.component.html',
  styleUrls: ['./short-card.component.scss']
})
export class ShortCardComponent implements OnInit {

  @Input() public task: Task;
  @Input() public color: string;

  constructor() { }

  ngOnInit() {
    
  }

}
