import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreApiService } from 'src/app/services/isa-store/store-api.service';
import { productStore } from 'src/app/models/productsStoreModule';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common'
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-edit-product-store',
  templateUrl: './edit-product-store.component.html',
  styleUrls: ['./edit-product-store.component.scss']
})
export class EditProductStoreComponent implements OnInit {
  product:any = [];
  mostratInfo:boolean = false;
  infoAdd:any = [];
  key:string = '';
  value:string = '';
  Usd: number = 0;
  result:productStore = {
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
    infoAdd:'[]',
    tags:'',
    color_data:'',
    fecven:'',
  }

  constructor(private serv: StoreApiService, private servSys: ProductService ,private location: Location, private activdeR: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activdeR.snapshot.params;
    if(params.id){
      this.serv.getProduct(params.id).subscribe(
        req => {
         this.product = req;
         this.result  = this.product;
         if(JSON.parse(this.result.tags) != null){
          this.fruits = JSON.parse(this.result.tags);
         }
         if(this.result.infoAddStatus){
          this.infoAdd = JSON.parse(this.result.infoAdd);
          this.mostratInfo = true;
         }else{
          this.infoAdd = [];
         }
        },
        err => console.error(err)
      )
    }
    this.converTo();
  }

  ver(e){
    this.mostratInfo = e;
  }
  addInfo(){
    let tempObject:any = { key: this.key ,value: this.value }
    this.infoAdd.push(tempObject)
    this.key   = '';
    this.value = '';
  }

  deleteInfoAdd(item){
    for(let i = 0; i < this.infoAdd.length; i++){
      if(item === this.infoAdd[i]){
        this.infoAdd.splice(i,1);
      }
    }
  }


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  converTo(){  
    this.servSys.getUsdValor().subscribe(
      req => {
        this.Usd = Object.values(req)[0].priceUSD;
      }
    )
  }



  edit(form:NgForm){
    if(form.valid){
      this.result.tags = JSON.stringify(this.fruits);
        if(this.result.infoAddStatus){
          this.result.infoAdd = JSON.stringify(this.infoAdd)
        }
        console.log(this.result)
        this.serv.updateProduct(this.activdeR.snapshot.params.id,this.result).subscribe(
          req => {
            this.servSys.openDialog("Producto editado satisfactoriamente","Ok")
            this.location.back();
          }
        )
      }else{
        this.servSys.openDialog("Al parecer algún campo que es requerido se encuentran en rojo, por favor llenelos y intente de nuevo","")
      }
    }
}
