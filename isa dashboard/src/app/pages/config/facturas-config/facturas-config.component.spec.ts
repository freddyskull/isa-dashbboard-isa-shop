import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasConfigComponent } from './facturas-config.component';

describe('FacturasConfigComponent', () => {
  let component: FacturasConfigComponent;
  let fixture: ComponentFixture<FacturasConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
