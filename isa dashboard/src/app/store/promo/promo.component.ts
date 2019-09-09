import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { StoreApiService } from 'src/app/services/isa-store/store-api.service';

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

  constructor(private servStore:StoreApiService) { }

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
        }
      });
     } 
    )
  }


  getPromo(){
    this.servStore.getpromos().subscribe(
      req => {
        console.log(req)
      } 
    )
  }


  savePromo(){
    console.log(this.promoTemp)
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
