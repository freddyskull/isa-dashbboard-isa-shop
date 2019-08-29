import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-store-list-product',
  templateUrl: './store-list-product.component.html',
  styleUrls: ['./store-list-product.component.scss']
})
export class StoreListProductComponent implements OnInit {

  constructor() { }
  filter:string = '';
  @Input() storeProducts;
  @Input() loadingStore;

  ngOnInit() {
  }

}
