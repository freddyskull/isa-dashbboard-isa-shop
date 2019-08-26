import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IsaApiFrontService {

  constructor(private http: HttpClient) { }

  API_URI = `http://192.168.1.11/db_isa_front/public/api/`;


  getProducts(){
    return this.http.get(`${this.API_URI}/productos`); 
  }

  getProduct(id: string | number){
    return this.http.get(`${this.API_URI}/productos/${id}`); 
  }

  deleteProduct(id: string){
    return this.http.delete(`${this.API_URI}/productos/${id}`);
  }

  updateProduct(id: string|number, product: any){
    return this.http.put(`${this.API_URI}/productos/${id}`, product)
  }

  saveProduct(product: any){
    return this.http.post( `${this.API_URI}/productos`,product)
  }
}
