import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-facturas-config',
  templateUrl: './facturas-config.component.html',
  styleUrls: ['./facturas-config.component.scss']
})
export class FacturasConfigComponent implements OnInit {

  constructor(private serv: ProductService, private snack: MatSnackBar) { }
  query: any = [];
  queryConfig: any = [];
  queryCuentas: any;
  direccion: string = '';
  direccion2: string = '';
  cuenta: string = '';
  nro: number = null;
  codigo: number = null;
  telefono: number = null;
  facturaConfig: any = {
    id: 0,
    JSON_facturacion: ''
  };
  ngOnInit() {
    this.Config();
  }

  Config() {
    this.serv.queryConfig().subscribe(
      req => {
        this.query = req;
        if (this.query.length > 0) {
          this.queryConfig = JSON.parse(Object(this.query)[0].JSON_facturacion)
          this.direccion = this.queryConfig.direccion;
          this.codigo = this.queryConfig.codigo;
          this.direccion2 = this.queryConfig.direccion2;
          this.telefono = this.queryConfig.tlf;
          this.queryCuentas = this.queryConfig.cuentas
        }
      }
    )
  }

  addConfiguraciones(form: NgForm) {
    if (form.valid) {
      var temp: any = {
        direccion: this.direccion,
        direccion2: this.direccion2,
        codigo: this.codigo,
        tlf: this.telefono,
        cuentas: [
          { banco: this.cuenta, nro: this.nro }
        ]
      }
      this.facturaConfig.JSON_facturacion = JSON.stringify(temp);
      if (this.query.length = 0) {
        this.serv.saveConfig(this.facturaConfig).subscribe(
          req => {
            this.cuenta = '';
            this.nro = null;
            this.snack.open('cuenta agregada', 'Ok', {
              duration: 3000,
            });
          }
        )
      } else {
        this.addCuenta()
      }

    } else {
      this.snack.open('Al parecer hubo un problema, rectifique los campos introducido e intente nuevamente', 'Ok', {
        duration: 4000,
      });
    }
  }

  addCuenta() {
    let temp: any = { banco: this.cuenta, nro: this.nro }
    this.queryConfig.cuentas.push(temp);
    this.facturaConfig.JSON_facturacion = JSON.stringify(this.queryConfig);
    this.serv.updateConfig(0,this.facturaConfig).subscribe(
      req => {
        this.cuenta = '';
        this.nro = null;
        this.snack.open('cuenta agregada', 'Ok', {
          duration: 3000,
        });
      }
    )
  }

  deleteCnta(item) {
    for (let i = 0; i < this.queryConfig.cuentas.length; i++) {
      if (item == this.queryConfig.cuentas[i]) {
        this.queryConfig.cuentas.splice(i, 1);
        this.facturaConfig.JSON_facturacion = JSON.stringify(this.queryConfig);
        this.serv.updateConfig(0, this.facturaConfig).subscribe(
          req => {
            this.snack.open('El banco fué eliminado', 'Ok', {
              duration: 4000,
            });
          }
        )
      }
    }
  }

}
