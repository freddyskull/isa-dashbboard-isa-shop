import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { StoreApiService } from 'src/app/services/isa-store/store-api.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {
  CategorysByStore: any = [];
  storeProductsTemp: any[];
  loadingStore: boolean = false;
  storeCategoryById: number = 0;
  promoTemp:any = [];

  constructor(private servStore:StoreApiService, private serv:ProductService) { }

  ngOnInit() {
    this.getCategoysBystore();
    this.getPromo();
  }


  getCategoysBystore(){
    this.servStore.getCategorys().subscribe(
      req => {
        this.CategorysByStore = req;
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
          this.storeProductsTemp.sort()
          this.promoTemp.sort();
          let arr = this.storeProductsTemp
          for (let i = 0; i < this.storeProductsTemp.length; i++) {
            for (let j = 0; j < this.promoTemp.length; j++) {
              if(this.storeProductsTemp[i].name === this.promoTemp[j].name){
                arr.splice(i,1);
                break
              }
            }
          }
        }
      });
     } 
    )
  }


  getPromo(){
    this.servStore.getpromos().subscribe(
      reqq => {
        Object(reqq).forEach(elementt => {
          this.servStore.getProduct(elementt.id_isa_fontEnd).subscribe(
            req => {
              let result:any = {
                id: elementt.id,
                name:Object(req).name,
                id_isa_fontEnd:Object(req).id,
                chat_id: Object(req).chat_id,
                description: Object(req).description,
                stock: Object(req).stock,
                priceS:Object(req).priceS,
                priceSD:Object(req).priceSD,
                precio_ancla: Object(req).precio_ancla,
                infoAddStatus: Object(req).infoAddStatus,
                infoAdd: Object(req).infoAdd,
                tags: Object(req).tags,
                rate: Object(req).rate
              }
              this.promoTemp.push(result)
            }
          )
        });
      } 
    )
  }


  savePromo(){
    let result:any = [] 
      this.promoTemp.forEach(element => {
        let temp = {
          id_isa_fontEnd:element.id,
          chat_id: 0,
          description: '',
          stock: '',
          priceS:element.priceS,
          priceSD:element.priceSD,
          precio_ancla: '',
          infoAddStatus: false,
          infoAdd: '',
          tags: '',
          rate: ''
        }
      result.push(temp);
      });
      let sinRepetidos = result.filter((valorActual, indiceActual, arreglo) => {
        return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
      });
      sinRepetidos.forEach(element => {
      console.log(element)
      this.servStore.savepromo(element).subscribe(
        req => {
          this.serv.openDialog("Promociones creadas, asegurese de editarlas y ser muy descriptivo","Ok")
        }
      )
    });
  }

  deletePromoProduct(id){
    this.servStore.deletepromo(id).subscribe(
      req => {
        this.getPromo();
        this.serv.openDialog("Promoción eliminada","Ok")
      }
    )
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }



}
