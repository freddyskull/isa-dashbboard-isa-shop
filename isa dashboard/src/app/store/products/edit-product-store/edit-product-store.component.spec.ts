import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductStoreComponent } from './edit-product-store.component';

describe('EditProductStoreComponent', () => {
  let component: EditProductStoreComponent;
  let fixture: ComponentFixture<EditProductStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
