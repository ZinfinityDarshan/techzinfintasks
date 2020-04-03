import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalScreenComponent } from './approval-screen.component';

describe('ApprovalScreenComponent', () => {
  let component: ApprovalScreenComponent;
  let fixture: ComponentFixture<ApprovalScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
