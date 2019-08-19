import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/addCart/cart.service';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';
import { EditProductComponent } from '../car/edit-product/edit-product.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  constructor(private cart:CartService, private serv:IsaBackendDataService, public dialog: MatDialog) { 
    
  }

  cesta: any = [];
  cestaLenght:number = 0;
  totalDolar:number = 0;
  totalBolivares:number = 0;
  divisa:boolean = false
  totales:any = {
    dolar: 0,
    bolivares: 0
  };

  ngOnInit() {
    this.getProduct();
  }

getProduct(){
  if(localStorage.getItem('cart') != null){
    let cesta:any = [] 
    cesta = this.cart.getproducts();
    let products:any = [];
    let j = 0;
    this.serv.getProducts().subscribe(
      req => {
        products = req;
        products.forEach(element => {
          if(cesta[j].id == element.id){
            cesta[j].precioBs    = element.precioBs;
            cesta[j].precioDolar = element.precioDolar;
            j++;
          }
        });
        this.cesta = cesta;
        this.cart.editproduct(this.cesta);
        this.calcular()
      }
    );
  }
}

  calcular(){
    if(localStorage.getItem('cart') != null){
      this.totalDolar = 0;
      this.totalBolivares = 0;
      this.cestaLenght = Object.keys(this.cart.getproducts()).length
      for (let i = 0; i < this.cestaLenght; i++) {
        if(this.cesta[i].divisa == false){
          this.totalBolivares += this.cesta[i].precioBs    * this.cesta[i].stock
        }
        if(this.cesta[i].divisa){
          this.totalDolar     += this.cesta[i].precioDolar * this.cesta[i].stock
        }
      }
      this.totales.bolivares = this.totalBolivares;
      this.totales.dolar     = this.totalDolar;
      this.cart.addTotales(this.totales);
    }
  }

  edit(item){
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

  delete(id){
    this.cart.deleteproduct(id);
    this.serv.openDialog("Producto eliminado","Ok")
    this.cesta = this.cart.getproducts();
  }

  allBs(){
    this.cart.allBs();
    this.cesta = this.cart.getproducts();
    this.getProduct();
  }

  allDolar(){
    this.cart.allDolar();    
    this.cesta = this.cart.getproducts();
    this.getProduct();
  }

  deleteAll(){
    this.cart.deleteAllproduct();
    this.cesta = [];
    this.serv.openDialog("Todos Los Productos Han Sido Eliminados","Ok")
  }

}
