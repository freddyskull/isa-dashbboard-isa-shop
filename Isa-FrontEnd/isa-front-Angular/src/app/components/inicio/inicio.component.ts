import { Component, OnInit } from '@angular/core';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private serv:IsaBackendDataService, private orderPipe: OrderPipe) { }
  promo:any = [];
  products:any = [];
  promoDia:any = [];
  categorys:any = [];
  promoDestac:any = [];
  productDestac:any = [];
  divisa:boolean = false;
  divisaAux:boolean = true;
  images = [1, 2, 3].map(() => `https://picsum.photos/600/200?random&t=${Math.random()}`);
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  ngOnInit() {
    this.getProudctData();
    this.getcategorys();
    this.getPromDia();
    this.getPromoData();
  }

  getcategorys(){
    this.serv.getCategorys().subscribe(
      req => {
        this.categorys = req;
      }
    )
  }

  getPromDia(){
    this.serv.getDiaProm().subscribe(
      req => {
        this.promoDia = req;
      }
    )
  }

  getProudctData(){
    this.serv.getProducts().subscribe(
      req => {
        let data:any = [];
        data = req;
        this.products = this.orderPipe.transform(data, 'updated_at');
        let ult = Object.keys(this.products).length;
        this.products.splice(6,ult);
        this.products.forEach(element => {
          if(element.promo = 1){
            this.productDestac = element;
          }
        });
      }
    )
  }

  getPromoData(){
    this.serv.getPromo().subscribe(
      req => {
        let data:any = [];
        data = req;
        this.promo = this.orderPipe.transform(data, 'updated_at');
        let ult = Object.keys(this.promo).length;
        this.promo.splice(6,ult);
        this.promo.forEach(element => {
          if(element.promo = 1){
            this.promoDestac = element;
          }
        });
      }
    )
  }

  

  divisaChange(e){
    this.divisa = e;
  }

}
