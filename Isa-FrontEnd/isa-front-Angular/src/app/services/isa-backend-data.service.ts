import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class IsaBackendDataService {

  constructor(private http:HttpClient, private _snackBar: MatSnackBar) { }

  URI = 'http://pruebas.clinicasanjuanbosco.com/db_isa_front/public/api'

  getProducts(){
    return this.http.get(`${this.URI}/productos`);
  }
  getProduct(id){
    return this.http.get(`${this.URI}/productos/${id}`);
  }

  getCategorys(){
    return this.http.get(`${this.URI}/categorias`);
  }
  openDialog(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }


  getDiaProm(){
    return this.http.get(`${this.URI}/prom_dia`);
  }

  getPromo(){
    return this.http.get(`${this.URI}/promo`);
  }

}
