import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoreApiService } from 'src/app/services/isa-store/store-api.service';

@Component({
  selector: 'app-store-list-product',
  templateUrl: './store-list-product.component.html',
  styleUrls: ['./store-list-product.component.scss']
})
export class StoreListProductComponent implements OnInit, OnChanges {

  constructor(private serv:StoreApiService) { }
  @Input() Usd;
  @Input() event;
  filter:string = '';
  products:any = [];
  loadingStore:boolean = false;
  categorys:any = [];
  categoryById:number = 0;


  ngOnInit() {
    this.getProducts();
    this.getCategorys()
  }

  ngOnChanges(changes:SimpleChanges): void {
   let Onchanges = changes['event'];
   if(Onchanges != undefined && Onchanges.currentValue == true){
    this.getCategorys();
   }
  }

  getProducts(){
    this.serv.getProducts().subscribe(
      req => {
        this.products = req;
      }
    )
  }


  getCategorys(){
    this.loadingStore = true;
    this.serv.getCategorys().subscribe(
      req => {
        this.categorys = req;
        this.loadingStore = false;
      }
    )
  }

  

}
