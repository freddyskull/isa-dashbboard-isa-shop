import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dasboard-list-product',
  templateUrl: './dasboard-list-product.component.html',
  styleUrls: ['./dasboard-list-product.component.scss']
})
export class DasboardListProductComponent implements OnInit {

  constructor(private serv: ProductService) { }
  filter:string = "";
  categorys:any = [];
  products:any = [];
  categoryId:number = 0;
  length:number = 0;
  selectedOptions:any = [];
  list:any = [];
  @Input() dataDashboard;
  @Input() Usd;
  @Output() productSend = new EventEmitter<any>();
  ngOnInit() {
    this.getCategorys()
  }

  
  selectCategory(e){
    this.getList(this.categoryId);
  }

  getCategorys(){
    this.serv.getCategorys().subscribe(
      req => {
        this.categorys = req;
      }
    )
  }
  
  add(){
    this.list = this.selectedOptions;
    this.productSend.emit(this.list);
  }

  getList(item){
      this.products = [];
      this.serv.getProducts().subscribe(
        req => {
          Object(req).forEach(element => {
            if(element.category == item){
              this.products.push(element);
              
            }
          });
         this.length = Object.keys(this.products).length
        }
      )
    }
  

}
