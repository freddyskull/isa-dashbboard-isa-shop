import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnComprarComponent } from './btn-comprar.component';

describe('BtnComprarComponent', () => {
  let component: BtnComprarComponent;
  let fixture: ComponentFixture<BtnComprarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnComprarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnComprarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
