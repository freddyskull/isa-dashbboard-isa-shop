import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { StoreApiService } from 'src/app/services/isa-store/store-api.service';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductsComponent } from '../../components/dialog/store-products/store-products.component';
import { StoreCategoryComponent } from 'src/app/components/dialog/store-category/store-category.component';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private serv:ProductService, private servStore: StoreApiService, public dialog: MatDialog) { }
  Usd: number;
  event:boolean = false;
  dashboardProducts:any = [];
  storeProducts:any = [];
  filter:string = "";
  filter2:string = "";
  loadingStore:boolean = false;
  dataDashboard:any = [];
  lengthProducts:number = 0;
  ngOnInit() {
    this.getPructBack();
    this.converTo();
    this.getStoreProducts();
  }

  getDataDashboard(e){
    e.forEach(element => {
      this.dataDashboard.push(element)  
    });
    let sinRepetidos = this.dataDashboard.filter((valorActual, indiceActual, arreglo) => {
      //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
      return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
    });
    this.dataDashboard = sinRepetidos;
    this.lengthProducts = this.dataDashboard.length;
    this.serv.openDialog("Acticulos agregados, si desea verlos haga click en la imágen de isa system","");
  }

  getPructBack(){
    this.serv.getProducts().subscribe(
      req =>{
        this.dashboardProducts = req;
      }
    )
  }

  delete(){

  }

  converTo(){  
    this.serv.getUsdValor().subscribe(
      req => {
        this.Usd = Object.values(req)[0].priceUSD
      }
    )
  }


  getStoreProducts(){
    this.loadingStore = true;
    this.servStore.getProducts().subscribe(
      req => {
        this.loadingStore = false;
        this.storeProducts = req;
      }
    )
  }

  openProduct(): void {
    const dialogRef = this.dialog.open(StoreProductsComponent, {
      width: '550px',
      data: this.dataDashboard
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataDashboard = result;
    });
  }

  openCategorys(): void {
    const dialogRef = this.dialog.open(StoreCategoryComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.event = result;
    });
  }

}
