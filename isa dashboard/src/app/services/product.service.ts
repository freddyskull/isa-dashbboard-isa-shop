import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { product } from '../models/productModel';
import { client } from '../models/client';
import { provider } from '../models/providersModel';
import { category } from '../models/categoryModel';
import { presupuesto } from '../models/presupuestoModel';
import { Users } from '../models/usersModel';
import { history } from '../models/historyModel';
import { permiss } from '../models/permissModel';
import { pend } from '../models/pendientesModel';
import { priceUSD } from '../models/priceUsdModel';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  presupuesto: presupuesto[];

  getPresupuestos() {
    return this.presupuesto;
  }

  addPre(pre: presupuesto) {
    this.presupuesto.push(pre)
  }

  deletePre(pre: presupuesto) {
    for (let i = 0; i < this.presupuesto.length; i++) {
      if (pre == this.presupuesto[i]) {
        this.presupuesto.splice(i, 1);
      }
    }
  }

  editPre(pre: presupuesto) {
    for (let i = 0; i < this.presupuesto.length; i++) {
      if (pre == this.presupuesto[i]) {
        this.presupuesto[i] = pre;
      }
    }
  }

  deleteAllPre() {
    this.presupuesto.splice(0, 50);
  }


  API_URI = `http://192.168.1.11:3000/api`;
  API_URI3 = `http://192.168.1.11:3000/private`;
  API_URI2 = 'https://s3.amazonaws.com/dolartoday/data.json'


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.presupuesto = [
      // {
      //   category: "1",
      //   description: "",
      //   description2: "",
      //   id: 185,
      //   img: "",
      //   iva: false,
      //   name: "producto 1 ",
      //   price: 315181.6,
      //   price2: 40,
      //   price3: 86674.9,
      //   price4: 10,
      //   priceB: "",
      //   recibo: "Amalie",
      //   stock: 4,
      // },
      // {
      //   category: "1",
      //   description: "",
      //   description2: "",
      //   id: 186,
      //   img: "",
      //   iva: false,
      //   name: "producto 2 ",
      //   price: 236386.2,
      //   price2: 30,
      //   price3: 78795.4,
      //   price4: 10,
      //   priceB: "",
      //   recibo: "Amalie",
      //   stock: 3,
      // },
      // {
      //   category: "1",
      //   description: "",
      //   description2: "",
      //   id: 188,
      //   img: "",
      //   iva: true,
      //   name: "producto 4",
      //   price: 630363.2,
      //   price2: 80,
      //   price3: 157590.8,
      //   price4: 20,
      //   priceB: "",
      //   recibo: "Amalie",
      //   stock: 4,
      // },
    ]
  }


  dropPresupuesto() {
    this.presupuesto.splice(0, 30);
  }


  //editando el precio del dolar
  updateUsdValor(id: string | number, usdValor: priceUSD) {
    return this.http.put(`${this.API_URI}/usdvalor/${id}`, usdValor)
  }

  getUsdValor() {
    return this.http.get(`${this.API_URI}/usdvalor`);
  }

  saveUsdValor(usdValor: priceUSD) {
    return this.http.post(`${this.API_URI}/usdvalor`, usdValor)
  }

  //editandar permisos de edición valga la redundancia
  updatePermiss(id: string | number, updatePermiss: permiss) {
    return this.http.put(`${this.API_URI3}/permiss/${id}`, updatePermiss)
  }

  getPermiss() {
    return this.http.get(`${this.API_URI3}/permiss`);
  }

  //usuarios
  getUsers() {
    return this.http.get(`${this.API_URI3}/users`);
  }

  getUser(id: string | number) {
    return this.http.get(`${this.API_URI3}/users/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_URI3}/users/${id}`);
  }

  updateUser(id: string | number, updateUsers: Users) {
    return this.http.put(`${this.API_URI3}/users/${id}`, updateUsers)
  }

  saveUser(prodct: Users) {
    return this.http.post(`${this.API_URI3}/users`, prodct)
  }

  //Historial de ventas
  getStatAct() {
    return this.http.get(`${this.API_URI3}/ventas/statAct`);
  }

  getStatAnt() {
    return this.http.get(`${this.API_URI3}/ventas/statAnt`);
  }

  getHistorys() {
    return this.http.get(`${this.API_URI3}/ventas`);
  }

  getHistory(id: string | number) {
    return this.http.get(`${this.API_URI3}/ventas/${id}`);
  }

  deleteHistory(id: string) {
    return this.http.delete(`${this.API_URI3}/ventas/${id}`);
  }

  updateHistory(id: string | number, updateHistorys: history) {
    return this.http.put(`${this.API_URI3}/ventas/${id}`, updateHistorys)
  }

  saveHistory(prodct: history) {
    return this.http.post(`${this.API_URI3}/ventas`, prodct)
  }

  //ventas pendientes
  getPends() {
    return this.http.get(`${this.API_URI}/pendientes`);
  }

  getPend(id: string | number) {
    return this.http.get(`${this.API_URI}/pendientes/${id}`);
  }

  deletePend(id: string) {
    return this.http.delete(`${this.API_URI}/pendientes/${id}`);
  }

  updatePend(id: string | number, updateventas: pend) {
    return this.http.put(`${this.API_URI}/pendientes/${id}`, updateventas)
  }

  savePend(prodct: pend) {
    return this.http.post(`${this.API_URI}/pendientes`, prodct)
  }
  //productos

  getProducts() {
    return this.http.get(`${this.API_URI}/product`);
  }

  getProduct(id: string | number) {
    return this.http.get(`${this.API_URI}/product/${id}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.API_URI}/product/${id}`);
  }

  updateProduct(id: string | number, updateProduct: product) {
    return this.http.put(`${this.API_URI}/product/${id}`, updateProduct)
  }

  saveProduct(prodct: product) {
    return this.http.post(`${this.API_URI}/product`, prodct)
  }
  //cierre de productos

  //clientes

  getClients() {
    return this.http.get(`${this.API_URI}/client`);
  }

  getClient(id: string) {
    return this.http.get(`${this.API_URI}/client/${id}`);
  }

  deleteclient(id: string) {
    return this.http.delete(`${this.API_URI}/client/${id}`);
  }

  updateclient(id: string | number, updateclient: client) {
    return this.http.put(`${this.API_URI}/client/${id}`, updateclient)
  }

  saveclient(clien: client) {
    return this.http.post(`${this.API_URI}/client`, clien)
  }

  // proveedores

  getProviders() {
    return this.http.get(`${this.API_URI}/provider`);
  }

  getProvider(id: string) {
    return this.http.get(`${this.API_URI}/provider/${id}`);
  }

  deleteProvider(id: string) {
    return this.http.delete(`${this.API_URI}/provider/${id}`);
  }

  updateProvider(id: string | number, updateprovider: provider) {
    return this.http.put(`${this.API_URI}/provider/${id}`, updateprovider)
  }

  saveProvider(pro: category) {
    return this.http.post(`${this.API_URI}/provider`, pro)
  }

  //config 
  
  queryConfig(){
    return this.http.get(`${this.API_URI}/config`);
  }
  saveConfig(form: any) {
    return this.http.post(`${this.API_URI}/config`, form);
  }
  deleteConfig(id) {
    return this.http.delete(`${this.API_URI}/config/${id}`);
  }
  updateConfig(id,form: any) {
    return this.http.put(`${this.API_URI}/config/${id}`, form);
  }
  
  //category

  saveCategory(cat: category | string) {
    return this.http.post(`${this.API_URI}/category`, cat)
  }

  getCategorys() {
    return this.http.get(`${this.API_URI}/category`);
  }

  getCategory(id: number | string) {
    return this.http.get(`${this.API_URI}/category/${id}`);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.API_URI}/category/${id}`);
  }

  updateCategory(id: string | number, updateCategory: category) {
    return this.http.put(`${this.API_URI}/category/${id}`, updateCategory)
  }

  // api de dolartoday
  getDolar() {
    return this.http.get(`${this.API_URI2}`);
  }


  openDialog(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
