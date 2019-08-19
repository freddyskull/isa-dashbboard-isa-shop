import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ProductService } from '../../../services/product.service'
import {ConvertBsPipe} from '../../../pipes/bsPipes/convert-bs.pipe';
@Component({
  selector: 'app-preview-factura',
  templateUrl: './preview-factura.component.html',
  styleUrls: ['./preview-factura.component.scss']
})
export class PreviewFacturaComponent implements OnInit {

  constructor(private serv: ProductService) { }
  @Input()nombre;
  @Input()name;
  @Input()vendedor;
  @Input()cedula;
  @Input()contacto;
  @Input()factura;
  @Input()observacion;
  @Input()metodo;
  @Input()optionChoose;
  @Input()efectivo;
  @Input()cheque;
  @Input()transferencia;
  @Input()deposito;
  @Input()tipoDV;
  @Input()butons;
  @Input()direccion;
  @Input()direccion2;
  @Input()origen;
  @Input()condic;
  @Output() Arra = new EventEmitter<any>();
  @Output() Arr2 = new EventEmitter<any>();
  @Output() aux5 = new EventEmitter<boolean>();
  pre: any = [];
  newArr: any = [];
  totales: any = [];
  aux4:boolean = true;
  usdValor:number = 0;
  ngOnInit() {
    this.getPresu();
    this. obtenerTotalIva()
    this.getUSD()
  }

// funciones que envian datos a componente padre
//****************************************** */
  /*************exportando las variables de resultado en un array************/
  EnviarArr(){
    this.Arra.emit(this.newArr);
    this.Arr2.emit(this.totales);
    this.aux5.emit(this.aux4);
    this.aux4 = false;
  }

// funciones de obtención de datos
getUSD(){
  this.serv.getUsdValor().subscribe(
    req => {
      this.usdValor = Object.values(req)[0].priceUSD
    }
  )
}

getPresu(){
  this.pre = this.serv.getPresupuestos()
}


// funciones de calculos de totales

 obtenerTotal(){
    var j = 0;
    var ult = Object(this.pre).length;
    for(let i = 0; i < ult; i++){
      if(this.tipoDV == false){
        j += (Math.trunc(Math.trunc(this.pre[i].price3) * 1.10) * this.pre[i].stock)
      }else{
        j += (Math.trunc(this.pre[i].price3) * this.pre[i].stock)
      }
    }
    return j;
  }

  obtenerTotalIvaSumado(){
    var j = 0;
    var ult = Object(this.pre).length;
    for(let i = 0; i < ult; i++){
       if(this.pre[i].iva == true){
          if(this.tipoDV == false){
            j += (Math.trunc(Math.trunc(this.pre[i].price3) * 1.10) * this.pre[i].stock)
          }else{
            j += Math.trunc(this.pre[i].price3) * this.pre[i].stock
          }
       }
    }
    return j;
  }

  obtenerTotalIva(){
    var j = 0;
    j = Math.trunc(this.obtenerTotalIvaSumado() * 0.16)
    return j;
  }
  obtenerTotalSinIva(){
    return (this.obtenerTotal() - this.obtenerTotalIvaSumado())
  }
  obtenerTotalSinIvaDetal(){
    var j = 0;
    var ult = Object(this.pre).length;
    for(let i = 0; i < ult; i++){
     if(this.pre[i].iva == false){
      j += Math.trunc(Math.trunc(Math.trunc(this.pre[i].price3) * 1.10) * this.pre[i].stock)
     }
    }
    return j;
  }
  obtenertotalDol(){
    var j = 0;
    var ult = Object.keys(this.serv.getPresupuestos()).length;
    for(let i = 0; i < ult; i++){
      j += this.serv.getPresupuestos()[i].price2
    }
    return j;
  }
  

//funciones para actualizar el array que se envia desde el modulo de presupuesto

  actuArr(){
    //primer if para saber si el metodo de pago fue en factura y en bs
    if(this.optionChoose == 1 && this.metodo == 'Bs'){
      this.facBs()
    }
    //primer if para saber si el metodo de pago fue en factura y en USD
    if(this.optionChoose == 1 && this.metodo == 'Usd'){
     this.facUs()
    }
    //notas de entregas
    if(this.optionChoose == 2 && this.metodo == 'Bs'){
       this.notBs()
    }
    if(this.optionChoose == 2 && this.metodo == 'Usd'){
      this.notUs()
    }
    this.EnviarArr();
  }

  facBs(){
    if(this.tipoDV == true){
      let j = 0;
      let ult = Object.keys(this.pre).length;
      for (let i = 0; i < ult; i++) {
        this.newArr[j] = {
          id: this.pre[i].id,
          name: this.pre[i].name,
          stock: this.pre[i].stock,
          price: this.pre[i].price,
          price2: this.pre[i].price3,
        }
        j++;
      }
     let aux = this.obtenerTotal() + this.obtenerTotalIva()
     this.totales = {
        subTotal:this.obtenerTotal(),
        montoIv:this.obtenerTotalIva(),
        montoEx:this.obtenerTotalSinIva(),
        montoTo:aux,
        montoIvSumado:this.obtenerTotalIvaSumado()
      }
      console.log("factura con bolivares al mayor")
    }else{
      let j = 0;
      let ult = Object.keys(this.pre).length;
      for (let i = 0; i < ult; i++) {
        this.newArr[j] = {
          id: this.pre[i].id,
          name: this.pre[i].name,
          stock: this.pre[i].stock,
          price: this.pre[i].price,
          price2: this.pre[i].price3,
        }
        j++;
      }
      let aux = this.obtenerTotal() + this.obtenerTotalIva()
      this.totales = {
        subTotal:this.obtenerTotal(),
        montoIv:this.obtenerTotalIva(),
        montoEx:this.obtenerTotalSinIva(),
        montoTo:aux,
        montoIvSumado:this.obtenerTotalIvaSumado()
      }
      console.log("factura con bolivares al detal")
    }
  } 
  facUs(){
      let j = 0;
      let ult = Object.keys(this.pre).length;
      for (let i = 0; i < ult; i++) {
        this.newArr[j] = {
          id: this.pre[i].id,
          name: this.pre[i].name,
          stock: this.pre[i].stock,
          price: this.pre[i].price2,
          price2: this.pre[i].price4,
        }
        j++;
      }
      this.totales = {
        subTotal:"",
        montoIv:"",
        montoEx:"",
        montoTo:this.obtenertotalDol()
      }
      console.log("factura con Dolares")
  }
  
  notBs(){
    if(this.tipoDV == true){
      let j = 0;
      let ult = Object.keys(this.pre).length;
      for (let i = 0; i < ult; i++) {
        this.newArr[j] = {
          id: this.pre[i].id,
          name: this.pre[i].name,
          stock: this.pre[i].stock,
          price: this.pre[i].price,
          price2: this.pre[i].price3,
        }
        j++;
      }
      let aux = this.obtenerTotal() + this.obtenerTotalIva()
      this.totales = {
        subTotal:this.obtenerTotal(),
        montoIv:this.obtenerTotalIva(),
        montoEx:this.obtenerTotalSinIva(),
        montoTo:aux
      }
      console.log("nota con Bolivares al mayor")
    }else{
      let j = 0;
      let ult = Object.keys(this.pre).length;
      for (let i = 0; i < ult; i++) {
        this.newArr[j] = {
          id: this.pre[i].id,
          name: this.pre[i].name,
          stock: this.pre[i].stock,
          price: this.pre[i].price,
          price2: this.pre[i].price3,
        }
        j++;
      }
      let aux = this.obtenerTotal() + this.obtenerTotalIva()
      this.totales = {
        subTotal:this.obtenerTotal(),
        montoIv:this.obtenerTotalIva(),
        montoEx:this.obtenerTotalSinIva(),
        montoTo:aux,
        motoToIvSum:this.obtenerTotalIvaSumado()
      }
      console.log("nota con Bolivares al detal")
    }
  }
  notUs(){
    if(this.tipoDV == true){
      let j = 0;
      let ult = Object.keys(this.pre).length;
      for (let i = 0; i < ult; i++) {
        this.newArr[j] = {
          id: this.pre[i].id,
          name: this.pre[i].name,
          stock: this.pre[i].stock,
          price: this.pre[i].price2,
          price2: this.pre[i].price4,
        }
        j++;
      }
      this.totales = {
        subTotal:"",
        montoIv:"",
        montoEx:"",
        montoTo:this.obtenertotalDol()
      }
      console.log("nota con Dolares al mayor")
    }else{
      let j = 0;
      let ult = Object.keys(this.pre).length;
      for (let i = 0; i < ult; i++) {
        this.newArr[j] = {
          id: this.pre[i].id,
          name: this.pre[i].name,
          stock: this.pre[i].stock,
          price: this.pre[i].price2,
          price2: this.pre[i].price4,
        }
        j++;
      }
      this.totales = {
        subTotal:"",
        montoIv:"",
        montoEx:"",
        montoTo:this.obtenertotalDol()
      }
      console.log("nota con Dolares al detal")
    }
  }

// funciones adicionales
 

  
fecha(){
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var f=new Date();
  return (f.getDate() + " - " + meses[f.getMonth()] + " - " + f.getFullYear())
}


}
