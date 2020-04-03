import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitComponentComponent } from './init-component.component';

describe('InitComponentComponent', () => {
  let component: InitComponentComponent;
  let fixture: ComponentFixture<InitComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
