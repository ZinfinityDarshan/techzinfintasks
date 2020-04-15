import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllNotificationComponent } from './view-all-notification.component';

describe('ViewAllNotificationComponent', () => {
  let component: ViewAllNotificationComponent;
  let fixture: ComponentFixture<ViewAllNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
