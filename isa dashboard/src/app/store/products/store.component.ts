import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { StoreApiService } from 'src/app/services/isa-store/store-api.service';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductsComponent } from '../../components/dialog/store-products/store-products.component';
import { StoreCategoryComponent } from 'src/app/components/dialog/store-category/store-category.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { productStore } from '../../models/productsStoreModule';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private serv:ProductService,private serv2:StoreApiService, private servStore: StoreApiService, public dialog: MatDialog) { }
  Usd: number;
  filterSystem:string = '';
  filterStore:string = '';
  event:boolean = false;
  systemProducts:any = [];
  storeProducts:any = [];
  storeProductsTemp:any = [];
  filter:string = "";
  filter2:string = "";
  CategorysBySystem:any = [];
  CategorysByStore:any = [];
  loadingStore:boolean = false;
  lengthProducts:number = 0;
  systemCategoryById:number = 0;
  storeCategoryById:number = 0;
  storeAddProductTemp:productStore = {
    id_isa_backend: 0,
    promo: 0,
    name: '',
    description: '',
    img:'',
    img_alt:'',
    stock:'',
    priceS:0,
    priceSD:0,
    IVA:0,
    precio_ancla:'',
    category_id:0,
    infoAddStatus:false,
    infoAdd:'',
    tags:'',
    color_data:'',
    fecven:'',
  }
  temp:any = [];
  result:any = [];
  ngOnInit() {
    this.converTo();
    this.getCategorysBySystem();
    this.getCategoysBystore();
  }



  
    // let sinRepetidos = this.dataDashboard.filter((valorActual, indiceActual, arreglo) => {
    //   //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
    //   return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
    // });

    deleteStoreProduct(id){
      this.servStore.deleteProduct(id).subscribe(
        req => {
          this.serv.openDialog("Producto eliminado","Ok");
          this.systemCategoryById = 0;
          this.storeCategoryById = 0;
        }
      )
    }

  //precio del dolar
  converTo(){  
    this.serv.getUsdValor().subscribe(
      req => {
        this.Usd = Object.values(req)[0].priceUSD
      }
    )
  }

  // tomando los datos de las categorias
  
  getCategorysBySystem(){
    this.serv.getCategorys().subscribe(
      req => {
        this.CategorysBySystem = req;
      }
    )
  }

  getCategoysBystore(){
    this.serv2.getCategorys().subscribe(
      req => {
        this.CategorysByStore = req;
      }
    )
  }
  // eventos que manejan la entrada de las categorias

  selectCategoryBySystem(e){
    this.systemProducts = [];
    this.serv.getProducts().subscribe(
      req =>{
        Object(req).forEach(element => {
          if(this.systemCategoryById == element.category){
            this.systemProducts.push(element)
            for (let i = 0; i < this.storeProductsTemp.length; i++) {
              for (let j = 0; j < this.systemProducts.length; j++) {
                if(this.storeProductsTemp[i].id_isa_backend === this.systemProducts[j].id){
                  this.systemProducts.splice(j,1);
                  break
                } 
              } 
            }
          }
        });
      }
    )
  }

  selectCategoryByStore($event){
    this.storeProductsTemp = [];
    this.loadingStore = true;
    this.servStore.getProducts().subscribe(
     req=>{
      Object(req).forEach(element => {
        if(element.category_id == this.storeCategoryById){
          this.storeProductsTemp.push(element);
        }
      });
     } 
    )
  }

  //crear categorias desde store

  openCategorys(): void {
    const dialogRef = this.dialog.open(StoreCategoryComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null ||result != false){
        this.getCategoysBystore();
      }
    });
  }

  addStore(){
    this.result = [];
    this.storeProductsTemp.forEach(element => {
      if(Object.keys(element).length <= 17){
        this.temp = {
          id_isa_backend: element.id,
          promo         : 0,
          name          : element.name,
          description   : '',
          img           : element.img,
          img_alt       : '',
          stock         : element.stock,
          priceS        : element.priceS,
          priceSD       : element.priceS$,
          IVA           : element.iva,
          category_id   : this.storeCategoryById,
          fecven        : element.fecven,
        }
        this.result.push(this.temp)
      }else{
        this.result.push(element);
      }
    });
    let ult = Object.keys(this.result).length;
    this.result.forEach((element,i) => {
      this.servStore.saveProduct(element).subscribe(
        req => {
          i++;
        }
      )
    });
    this.serv.openDialog("Productos guardados satisfactoriamente","Ok")
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
