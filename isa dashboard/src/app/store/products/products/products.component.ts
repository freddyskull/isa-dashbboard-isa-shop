import { Component, OnInit } from '@angular/core';
import { IsaApiFrontService } from 'src/app/services/isa-db-front/isa-api-front.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private serv: IsaApiFrontService,private servFront: ProductService) { }

  isaBack:any = [];
  Usd:number = 0;

  ngOnInit() {
    this.getproductsIsaback();
    this.converTo();
  }

  getproductsIsaback(){
    this.servFront.getProducts().subscribe(
      req => {
        this.isaBack = req;
      }
    )
  }

  converTo(){  
    this.servFront.getUsdValor().subscribe(
      req => {
        this.Usd = Object.values(req)[0].priceUSD
      }
    )
  }

}
