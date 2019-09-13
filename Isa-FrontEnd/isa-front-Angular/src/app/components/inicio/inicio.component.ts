import { Component, OnInit } from '@angular/core';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';
import { OrderPipe } from 'ngx-order-pipe';
import { MatDialog } from '@angular/material';
import { BtnComprarComponent } from '../../dialog/btn-comprar/btn-comprar.component'
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  location: Location;
  constructor(private serv:IsaBackendDataService, private orderPipe: OrderPipe, private dialog:MatDialog, location: Location) { this.location = location; } 
  promo:any = [];
  products:any = [];
  promoDia:any = [];
  categorys:any = [];
  promoDestac:any = [];
  productDestac:any = [];
  divisa:boolean = false;
  divisaAux:boolean = true;
  Usd:number = 0;
  mobil:boolean = false;
  ngOnInit() {
    if(window.innerWidth < 767){
      this.mobil = true;
    }
    this.getProudctData();
    this.getcategorys();
    // this.getPromDia();
    // this.getPromoData();
    this.getConvert();
  }

  getConvert(){
    this.serv.getConfig(1).subscribe(
      req => {
        this.Usd = Object(req).dolarPrice;
      }
    )
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
