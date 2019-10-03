import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  calendarPlugins = [dayGridPlugin];

  events = [
    { title: 'event 1', date: '2019-09-07', editable: true  },
    { title: 'event 2', date: '2019-09-08' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
