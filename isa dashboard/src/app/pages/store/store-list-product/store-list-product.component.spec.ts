import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListProductComponent } from './store-list-product.component';

describe('StoreListProductComponent', () => {
  let component: StoreListProductComponent;
  let fixture: ComponentFixture<StoreListProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreListProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
