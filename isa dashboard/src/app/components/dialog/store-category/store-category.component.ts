import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StoreApiService } from 'src/app/services/isa-store/store-api.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-store-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['./store-category.component.scss']
})
export class StoreCategoryComponent implements OnInit {

  
  constructor(
    public serv: StoreApiService,
    public serv2: ProductService,
    public dialogRef: MatDialogRef<StoreCategoryComponent>) {}

    data:any = [];
    click:boolean = false;
    loading:boolean = false;
    loadingCat:boolean = false;
    event:boolean = false;
    result:any = {
      nombre: '',
      descripcion: ''
    }
  ngOnInit() {
    this.getCategorys();
  }

  getCategorys(){
    this.loadingCat = true;
    this.serv.getCategorys().subscribe(
      req => {
        this.loadingCat = false;
        this.data = req;
      }
    )
  }


  onNoClick(){
    this.dialogRef.close(this.event);
  }

  addCategorys(){
    this.loading = true;
    if(this.result.nombre != ''){
      this.serv.saveCategory(this.result).subscribe( 
        req => { 
          this.getCategorys();
          this.serv2.openDialog("Categoria creada","Ok")
          this.loading = false;
          this.event = true;
         }
      )
    }
  }


  delete(item){
    this.serv.deleteCategory(item.id).subscribe(
      req => {
        this.getCategorys();
        this.event = true;
      }
    )
  }



}
