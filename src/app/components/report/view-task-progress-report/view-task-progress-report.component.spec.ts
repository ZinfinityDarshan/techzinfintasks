import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskProgressReportComponent } from './view-task-progress-report.component';

describe('ViewTaskProgressReportComponent', () => {
  let component: ViewTaskProgressReportComponent;
  let fixture: ComponentFixture<ViewTaskProgressReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskProgressReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
