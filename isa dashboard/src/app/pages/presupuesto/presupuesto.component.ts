import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../models/productModel';
import * as jsPDF from 'jspdf';
import {  Router } from '@angular/router';
import html2canvas from 'html2canvas'; 
import { ConvertBsPipe } from 'src/app/pipes/bsPipes/convert-bs.pipe';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {
 
  constructor(private serv: ProductService, private rout:Router) { }

  product: product = {
    id: 0,
    name: "",
    priceB: "",
    priceS: "",
    stock: "",
    recibo: "",
    create_at: new Date(),
    description: "",
    category: "",
    img: ""
  };
  
  productos:any =[]
  pro:number = 0;
  pr:any = [];
  aux: boolean = false;
  aux2: boolean = false;
  aux3: boolean = false;
  usdValor: number = 0;
  total: number;
  stock:number;
  Id: number;
  err:boolean = false;
  err2:boolean = false;
  show:boolean = true;
  presu:any;
  pre:any = [];
  currency:string ="";
  variablesPresu:any = [];
  ngOnInit() {
    this.serv.getUsdValor().subscribe(
      req => {
        this.usdValor = Object.values(req)[0].priceUSD
      }
    )
    this.getProduct()
    this.obtener()
  }


  //obtener datos desde BD
  obtener(){
    this.pre = this.serv.getPresupuestos()
    console.log(this.pre)
  }
  getProduct(){
    this.serv.getProducts().subscribe(
      res => {
        let j = 0;
        let ult = Object.values(res).length;
        for(let i = 0; i < ult; i++){
          if(res[i].stock != 0){
            this.productos[j] = res[i]
            j++;
          }
        }
      },
      err => console.log(err)
    )
  }

  //obtener totales
  

 
  obtenerTotal(){
    var j = 0;
    var ult = Object(this.pre).length;
    for(let i = 0; i < ult; i++){
      if(this.variablesPresu.venta == false){
        j += (Math.trunc(this.pre[i].price3) * this.pre[i].stock)
      }else{
        j += (Math.trunc(Math.trunc(this.pre[i].price3) * 1.10) * this.pre[i].stock)
      }
    }
    return j;
  }

  obtenerTotalIvaSumado(){
    var j = 0;
    var ult = Object(this.pre).length;
    for(let i = 0; i < ult; i++){
       if(this.pre[i].iva == true){
          if(this.variablesPresu.venta == false){
            j += Math.trunc(this.pre[i].price3) * this.pre[i].stock
          }else{
            j += (Math.trunc(Math.trunc(this.pre[i].price3) * 1.10) * this.pre[i].stock)
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
  //obtener datos desde componente hijo

  getPro(e){
    this.err = false;
    this.serv.getProduct(e).subscribe(
      req => {
        this.pr = req;
        this.stock = Object.values(req)[4]
        this.aux = true;
        this.show = false;
      }
    )
  }

  getInfo(e){
    this.variablesPresu = e;
    console.log('varibles recibidas ' +e)

  }

  
  //mostrar el presupuesto en pdf
  presupuest(e){
    
    if(this.variablesPresu.atention != ""){
      var data = document.getElementById('contentToConvert'); 
      var doc = new jsPDF()
      var logo = new Image();
      logo.src = './assets/img/logo_opt.png';
      doc.addImage(logo, 'PNG', 5, 5, 200, 60)
      html2canvas(data).then(canvas => {  
        var imgWidth = 180;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const contentDataURL = canvas.toDataURL('image/png')    
        doc.setFontSize(12)
        doc.text(15, 80, 'ATENCIÓN: ' + this.variablesPresu.atention)
        if(this.variablesPresu.rifCed == undefined || this.variablesPresu.rifCed == ''){
          doc.text(15, 85, 'RIF/ CI: ')
        }else{
          doc.text(15, 85, 'RIF/ CI: ' + this.variablesPresu.rifCed)
        }        
        //doc.text(15, 73, 'DIRECCIÓN: ')
        doc.text(135, 80, 'FECHA: ' + this.fecha())
        if(this.variablesPresu.tlf == undefined || this.variablesPresu.tlf == ''){
          doc.text(135, 85, 'TLF: ')
        }else{
          doc.text(135, 85, 'TLF: ' + this.variablesPresu.tlf)
        }
        doc.text(15, 90, 'VENDEDOR: ' + this.variablesPresu.vendedor)
        doc.setFontSize(8)
        //doc.text(42, 71, '' + this.variablesPresu.address)
        //doc.text(42, 74, ''+ this.variablesPresu.address2)
        doc.setFontSize(12)
        doc.setFontType("bold")
        doc.text(90, 105,'COTIZACIÓN')
        doc.text(76, 110,'SOLICITUD DE COTIZACIÓN')
        doc.setFontType("normal")

        //tabla
        doc.addImage(contentDataURL, 'PNG', 15, 120, imgWidth, imgHeight)  
        
       
        if(this.currency == 'Bs'){//este obviamente evalua si es en bolivares
          doc.text(135, 235,`SUB-TOTAL BS.S ${ConvertBsPipe.prototype.transform(this.obtenerTotal())}` )
          doc.text(81, 240,` MONTO TOTAL BASE IMPONIBLE 16% BS.S ${ConvertBsPipe.prototype.transform(this.obtenerTotalIvaSumado())}`)
          doc.text(85, 245,`MONTO TOTAL EXONERADO DE IVA BS.S ${ConvertBsPipe.prototype.transform(this.obtenerTotalSinIva())}`)
          doc.text(102, 250,`MONTO TOTAL I.V.A AL 16% BS.S ${ConvertBsPipe.prototype.transform(this.obtenerTotalIva())}` )
          doc.setFontType("bold")
          doc.text(108, 255,`MONTO TOTAL A PAGAR BS.S ${ConvertBsPipe.prototype.transform(this.obtenerTotal() + this.obtenerTotalIva())}` );
          doc.setFontType("normal")
        }else{
          if(this.variablesPresu.venta == true){
            doc.setFontType("bold")
            doc.text(90, 255,'MONTO TOTAL A PAGAR USD ' + this.obtenertotalDol().toFixed(2));
          }else{
            doc.setFontType("bold")
            doc.text(90, 255,'MONTO TOTAL A PAGAR USD ' + (this.obtenertotalDol() * 1.10).toFixed(2));
          }
        }
        doc.setFontType("normal")
        doc.text(15, 265,'EMAIL: insufarmaventas@gmail.com/ insufarmaordencompras@gmail.com')
        doc.text(15, 270,'CUENTAS BANCARIAS: DEPOSITO TRANSFERENCIAS O CHEQUES')
        doc.text(15, 275,'A NOMBRE DE: INSUFARMA FALCON, CA')
        doc.text(15, 280,'RIF: J - 411036129')
        doc.text(15, 285,'BANCO MERCANTIL: 0105 - 0104 - 11 1104169118')
        doc.text(15, 290,'BOD: 0116 - 0177 - 42 - 0028764030')
        doc.setTextColor(0, 0, 255)
        doc.text(15, 295,'NOTA: COTIZACIÓN VALIDA SOLO POR HOY')
        doc.save(`Contización para ${this.variablesPresu.atention} ${this.fecha()}.pdf`)
        this.rout.navigate(['/inicio'])
      });
    }
  }
  presuCurrency(e){
    this.currency = e;
  }
  chageShow(e){
    this.show = true;
    this.aux = false;
    this.pro = e;
    this.aux3 =true;
  }
  variables(e){
    this.presu = e
  }
//funciones adicionales
onIsError():void{
  this.err = true;
  setTimeout(()=>{
    this.err = false;
  },4000);
}

  fecha(){
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date();
    return (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear())
  }
}
