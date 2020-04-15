import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageVieverComponent } from './image-viever.component';

describe('ImageVieverComponent', () => {
  let component: ImageVieverComponent;
  let fixture: ComponentFixture<ImageVieverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageVieverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageVieverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
