import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardListProductComponent } from './dasboard-list-product.component';

describe('DasboardListProductComponent', () => {
  let component: DasboardListProductComponent;
  let fixture: ComponentFixture<DasboardListProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DasboardListProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
