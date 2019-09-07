import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-product-store',
  templateUrl: './list-product-store.component.html',
  styleUrls: ['./list-product-store.component.scss']
})
export class ListProductStoreComponent implements OnInit {

  constructor() { }
  
  @Input() isaBack;
  @Input() Usd;
  filter:string = "";
  ngOnInit() {
  }

}
