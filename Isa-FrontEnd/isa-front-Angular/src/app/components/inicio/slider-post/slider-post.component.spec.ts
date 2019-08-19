import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderPostComponent } from './slider-post.component';

describe('SliderPostComponent', () => {
  let component: SliderPostComponent;
  let fixture: ComponentFixture<SliderPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
