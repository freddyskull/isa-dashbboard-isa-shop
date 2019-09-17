import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/addCart/cart.service';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';
import { EditProductComponent } from '../car/edit-product/edit-product.component';
import { MatDialog } from '@angular/material/dialog';
import { PricePipe } from '../../pipes/priceReal/price.pipe';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  constructor(private cart: CartService, private serv: IsaBackendDataService, public dialog: MatDialog) {

  }

  cesta: any = [];
  cestaLenght: number = 0;
  totalDolar: number = 0;
  totalBolivares: number = 0;
  divisa: boolean = false;
  loading: boolean = false;
  Usd: number = 0;
  totales: any = {
    dolar: 0,
    bolivares: 0
  };

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    if (localStorage.getItem('cart') != null) {
      this.loading = true;
      this.serv.getConfig(1).subscribe(
        req => {
          this.Usd = Object(req).dolarPrice;
          this.getProducts()
        }
      )
    }
  }

  getProducts() {
    let cart = this.cart.getproducts();
    this.cestaLenght = Object.keys(this.cart).length;
    cart.forEach(element => {
      this.serv.getProduct(element.id).subscribe(
        req => { 
          this.loading = false;
          let temp = {
            divisa:element.divisa,
            id:element.id,
            id_isa_backend:element.id_isa_backend,
            img:element.img,
            priceS: PricePipe.prototype.transform(element.priceS,Object(req),this.Usd),
            priceSD: PricePipe.prototype.transform(element.priceSD,Object(req),this.Usd),
            stock:element.stock
          }
          this.cesta.push(temp)
         }
      )
    });
  }

  // calcular(){
  //   if(localStorage.getItem('cart') != null){
  //     this.totalDolar = 0;
  //     this.totalBolivares = 0;
  //     this.cestaLenght = Object.keys(this.cart.getproducts()).length
  //     for (let i = 0; i < this.cestaLenght; i++) {
  //       if(this.cesta[i].divisa == false){
  //         this.totalBolivares += this.cesta[i].priceS    * this.cesta[i].stock
  //       }
  //       if(this.cesta[i].divisa){
  //         this.totalDolar     += this.cesta[i].priceSD * this.cesta[i].stock
  //       }
  //     }
  //     this.totales.bolivares = this.totalBolivares;
  //     this.totales.dolar     = this.totalDolar;
  //     this.cart.addTotales(this.totales);
  //   }
  // }

  edit(item){
    this.cesta = [];
      const dialogRef = this.dialog.open(EditProductComponent, {
        width: '250px',
        data: item
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          this.cart.editproduct(result);          
          this.getProduct();
        }
      });
  }

  delete(id) {
    this.cart.deleteproduct(id);
    this.serv.openDialog("Producto eliminado", "Ok")
    this.cesta = this.cart.getproducts();
  }

  allBs() {
    this.cart.allBs();
    this.cesta = [];
    this.cesta = this.cart.getproducts();
    this.getProduct();
  }

  allDolar() {
    this.cesta = [];
    this.cart.allDolar();
    this.cesta = this.cart.getproducts();
    this.getProduct();
  }

  deleteAll() {
    this.cart.deleteAllproduct();
    this.cesta = [];
    this.serv.openDialog("Todos Los Productos Han Sido Eliminados", "Ok")
  }

}
