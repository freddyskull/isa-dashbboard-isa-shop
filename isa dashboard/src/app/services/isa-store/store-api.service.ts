import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class StoreApiService {

  constructor(private http: HttpClient) { }

  API_URI = `http://pruebas.clinicasanjuanbosco.com/db_isa_front/public/api`;

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
    return this.http.put(`${this.API_URI}/productos/${id}`, updateproductos)
  }

  saveProduct(prodct: any){
    return this.http.post( `${this.API_URI}/productos`,prodct)
  }
}
