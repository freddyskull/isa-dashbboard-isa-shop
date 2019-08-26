import { Component, OnInit } from '@angular/core';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OrderPipe } from 'ngx-order-pipe';
import { MatDialog } from '@angular/material';
import { BtnComprarComponent } from '../../dialog/btn-comprar/btn-comprar.component'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private serv:IsaBackendDataService, private orderPipe: OrderPipe, private dialog:MatDialog) { }
  promo:any = [];
  products:any = [];
  promoDia:any = [];
  categorys:any = [];
  promoDestac:any = [];
  productDestac:any = [];
  divisa:boolean = false;
  divisaAux:boolean = true;
  
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
  comparaModal(item:any){
    const dialogRef = this.dialog.open(BtnComprarComponent, {
      width: '450px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  

  divisaChange(e){
    this.divisa = e;
  }

}
