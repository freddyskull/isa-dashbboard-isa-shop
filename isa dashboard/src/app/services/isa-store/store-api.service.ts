import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class StoreApiService {

  constructor(private http: HttpClient) { }

  API_URI = `http://localhost/db_isa_front/public/api`;

  getProducts(){
    return this.http.get(`${this.API_URI}/productos`); 
  }

  getProduct(id: string | number){
    return this.http.get(`${this.API_URI}/productos/${id}`); 
  }

  deleteProduct(id: string){
    return this.http.delete(`${this.API_URI}/productos/${id}`);
  }

  updateProduct(id: string|number, updateproductos: any){
    return this.http.put(`${this.API_URI}/productos/${id}`, updateproductos);
  }

  saveProduct(prodct: any){
    return this.http.post( `${this.API_URI}/productos`,prodct);
  }

  //categorys

  getCategorys(){
    return this.http.get(`${this.API_URI}/categorias`); 
  }

  getCategory(id: string | number){
    return this.http.get(`${this.API_URI}/categorias/${id}`); 
  }

  deleteCategory(id: string){
    return this.http.delete(`${this.API_URI}/categorias/${id}`);
  }

  updateCategory(id: string|number, updatecategory: any){
    return this.http.put(`${this.API_URI}/categorias/${id}`, updatecategory);
  }

  saveCategory(prodct: any){
    return this.http.post( `${this.API_URI}/categorias`,prodct);
  }


  //config

  getConfigs(){
    return this.http.get(`${this.API_URI}/config`); 
  }

  getConfig(id: string | number){
    return this.http.get(`${this.API_URI}/config/${id}`); 
  }

  deleteConfig(id: string){
    return this.http.delete(`${this.API_URI}/config/${id}`);
  }

  updateConfig(id: string|number, updatecategory: any){
    return this.http.put(`${this.API_URI}/config/${id}`, updatecategory);
  }

  saveConfig(prodct: any){
    return this.http.post( `${this.API_URI}/config`,prodct);
  }

  // promo
  getpromos(){
    return this.http.get(`${this.API_URI}/promociones`); 
  }

  getpromo(id: string | number){
    return this.http.get(`${this.API_URI}/promociones/${id}`); 
  }

  deletepromo(id: string){
    return this.http.delete(`${this.API_URI}/promociones/${id}`);
  }

  updatepromo(id: string|number, data: any){
    return this.http.put(`${this.API_URI}/promociones/${id}`, data);
  }

  savepromo(data: any){
    return this.http.post( `${this.API_URI}/promociones`,data);
  }
}
