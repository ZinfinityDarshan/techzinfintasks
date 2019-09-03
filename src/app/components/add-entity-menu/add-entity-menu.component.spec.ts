import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityMenuComponent } from './add-entity-menu.component';

describe('AddEntityMenuComponent', () => {
  let component: AddEntityMenuComponent;
  let fixture: ComponentFixture<AddEntityMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntityMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
