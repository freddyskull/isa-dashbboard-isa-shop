import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from 'src/app/services/addCart/cart.service';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';
import { Car } from 'src/app/models/carModel';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-btn-comprar',
  templateUrl: './btn-comprar.component.html',
  styleUrls: ['./btn-comprar.component.scss']
})
export class BtnComprarComponent implements OnInit {

  constructor(
    public serv:IsaBackendDataService,
    public cart:CartService,
    public dialogRef: MatDialogRef<BtnComprarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    result:Car = {
      divisa: false,
      id: this.data.id,
      id_isa_backend: this.data.id,
      img: this.data.img,
      nombre: this.data.nombre,
      precioBs: this.data.precioBs,
      precioDolar: this.data.precioDolar,
      stock: 1
    }
    divisas: any[] = [
      {value: false, divisa: 'Bolivares'},
      {value: true,  divisa: 'Dolares'},
    ];

  

  ngOnInit() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  comprar(form:NgForm){
    if( form.valid && this.result.stock <= this.data.stock ){
      this.cart.addproduct(this.result)
      this.serv.openDialog(`El producto ${this.data.nombre} ha sido enviado a su cesta de compras`,"Ok")
      this.dialogRef.close();
    }
    if(this.result.stock > this.data.stock){
      this.serv.openDialog(`Su compra no puede ser procesada debido a que está introduciendo una cantidad mayor a la existente`,"")
    }
  }

}
