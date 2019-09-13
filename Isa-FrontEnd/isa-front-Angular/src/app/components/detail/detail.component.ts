import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { IsaBackendDataService } from '../../services/isa-backend-data.service';
import { CartService } from 'src/app/services/addCart/cart.service';
import { Car } from 'src/app/models/carModel';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private serv: IsaBackendDataService ,private rout: Router,private activdeR: ActivatedRoute, private cart:CartService) { }
  
  product:any = [];
  divisa:boolean = false;
  auxD:boolean = true;
  categorys:any = [];
  Usd:number = 0;
  car:Car = {
    nombre: '',
    id_isa_backend: 0,
    id:0,
    precioBs: 0,
    precioDolar: 0,
    stock: 1,
    img: '',
    divisa: true
  }
  ngOnInit() {
    const params = this.activdeR.snapshot.params;
    if(params.id){
      this.serv.getProduct(params.id).subscribe(
        req => {
         this.product = req;
         console.log(req)
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


  agregar(){
    this.car.id             = this.product.id;
    this.car.nombre         = this.product.nombre;
    this.car.precioBs       = this.product.precioBs;
    this.car.precioDolar    = this.product.precioDolar;
    this.car.img            = this.product.img;
    this.car.id_isa_backend = this.product.id_isa_backend;
    this.car.divisa         = this.divisa;
    if(this.product.stock > this.car.stock){
      this.cart.addproduct(this.car);
      this.serv.openDialog("¡El producto ha sido añadido a su cesta de compras!","Ok");
      this.rout.navigate(['/productos']);
    }else{
      this.serv.openDialog("La cantidiad que desea comprar no está disponible","Ok");
    }
  }


}
