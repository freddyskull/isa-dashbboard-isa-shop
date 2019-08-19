import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cryptoKey ="456"
  product: any[];
  totales: any[];

getproducts(){
  if(localStorage.getItem('cart') == null){
    return this.product = [];
  }else{
    return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('cart'), this.cryptoKey).toString(CryptoJS.enc.Utf8));
  }
}

addproduct(product){
 this.product = [];
  if(localStorage.getItem('cart') == null){
    this.product.push(product);
    let stringCrypted = CryptoJS.AES.encrypt(JSON.stringify(this.product), this.cryptoKey).toString();
    localStorage.setItem('cart', stringCrypted)
  }else{
    this.product = [];
    let newArr = this.getproducts();
    newArr.push(product);
    let stringCrypted = CryptoJS.AES.encrypt(JSON.stringify(newArr), this.cryptoKey).toString();
    localStorage.setItem('cart', stringCrypted)
  }
}

deleteproduct(product){
   let arr:any = [];
   arr = this.getproducts()
  for(let i = 0; i < Object.keys(arr).length; i++){
    if(product.id == arr[i].id){
      arr.splice(i,1)
      let stringCrypted = CryptoJS.AES.encrypt(JSON.stringify(arr), this.cryptoKey).toString();
      localStorage.setItem('cart', stringCrypted)
    }
  }
}

editproduct(product){
  let arr:any = []
  arr = this.getproducts()
  arr.forEach(element => {
    if(product.id == element.id){
      element.stock = product.stock
      element.divisa = JSON.parse(product.divisa)
    }
  });
  let stringCrypted = CryptoJS.AES.encrypt(JSON.stringify(arr), this.cryptoKey).toString();
  localStorage.setItem('cart', stringCrypted);
}

deleteAllproduct(){
  let arr = this.getproducts();
  arr.splice(0,50);
  let stringCrypted = CryptoJS.AES.encrypt("[]", this.cryptoKey).toString();
  localStorage.setItem('cart', stringCrypted);
}


/* Totales */
addTotales(totales){
  this.totales = []
  this.totales.push(totales);
  let stringCrypted = CryptoJS.AES.encrypt(JSON.stringify(this.totales), this.cryptoKey).toString();
  localStorage.setItem('totales', stringCrypted);
}

getTotales(){
  return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('totales'), this.cryptoKey).toString(CryptoJS.enc.Utf8));
}


allBs(){
  let Arr = this.getproducts()
  Arr.forEach(element => {
    if(element.divisa){
      element.divisa = false;
    }
  });
    let stringCrypted = CryptoJS.AES.encrypt(JSON.stringify(Arr), this.cryptoKey).toString();
    localStorage.setItem('cart', stringCrypted)
}

allDolar(){
  let Arr = this.getproducts()
  Arr.forEach(element => {
    if(!element.divisa){
      element.divisa = true;
    }
  });
    let stringCrypted = CryptoJS.AES.encrypt(JSON.stringify(Arr), this.cryptoKey).toString();
    localStorage.setItem('cart', stringCrypted)
}


deleteAllTotales(){
  this.totales.splice(0,50);
  localStorage.setItem('totales', JSON.stringify(this.totales));
}

  constructor() { 
    if(localStorage.getItem('cart') == null){
      this.product = [];
    }
  }
}
