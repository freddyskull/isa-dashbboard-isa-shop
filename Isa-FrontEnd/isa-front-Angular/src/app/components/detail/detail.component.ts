import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { IsaBackendDataService } from '../../services/isa-backend-data.service';
import { CartService } from 'src/app/services/addCart/cart.service';
import { Car } from 'src/app/models/carModel';
import { BtnComprarComponent } from 'src/app/dialog/btn-comprar/btn-comprar.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private serv: IsaBackendDataService ,private rout: Router,private activdeR: ActivatedRoute, private cart:CartService, private dialog: MatDialog) { }
  
  product:any = [];
  divisa:boolean = false;
  auxD:boolean = true;
  categorys:any = [];
  Usd:number = 0;
  loading:boolean = false;
  tags:any = [];
  car:Car = {
    nombre: '',
    id_isa_backend: 0,
    id:0,
    priceS: 0,
    priceSD: 0,
    stock: 1,
    img: '',
    divisa: true
  }
  ngOnInit() {
    const params = this.activdeR.snapshot.params;
    if(params.id){
      this.loading = true;
      this.serv.getProduct(params.id).subscribe(
        req => {
          this.loading = false;
         this.product = req;
         console.log(this.product)
         this.product.infoAdd = JSON.parse(this.product.infoAdd)
         if(this.product.tags != null){
          this.tags = JSON.parse(this.product.tags)
         }
        },
        err => console.error(err)
      )
    }
    this.getConvert();
  }


  getConvert(){
    this.serv.getConfig(1).subscribe(
      req => {
        this.Usd = Object(req).dolarPrice;
      }
    )
  }

  getCategory(){
    this.serv.getCategorys().subscribe(
      req => {
        this.categorys = req; 
      }
    )
  }
  openDialog(item): void {
    const dialogRef = this.dialog.open(BtnComprarComponent, {
      width: '450px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      
      
    });
  }


  // agregar(){
  //   this.car.id             = this.product.id;
  //   this.car.nombre         = this.product.nombre;
  //   this.car.priceS       = this.product.priceS;
  //   this.car.priceSD    = this.product.priceSD;
  //   this.car.img            = this.product.img;
  //   this.car.id_isa_backend = this.product.id_isa_backend;
  //   this.car.divisa         = this.divisa;
  //   if(this.product.stock > this.car.stock){
  //     this.cart.addproduct(this.car);
  //     this.serv.openDialog("¡El producto ha sido añadido a su cesta de compras!","Ok");
  //     this.rout.navigate(['/productos']);
  //   }else{
  //     this.serv.openDialog("La cantidiad que desea comprar no está disponible","Ok");
  //   }
  // }


}
