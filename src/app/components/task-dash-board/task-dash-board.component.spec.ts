import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDashBoardComponent } from './task-dash-board.component';

describe('TaskDashBoardComponent', () => {
  let component: TaskDashBoardComponent;
  let fixture: ComponentFixture<TaskDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
