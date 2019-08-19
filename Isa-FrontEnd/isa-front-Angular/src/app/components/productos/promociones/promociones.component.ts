import { Component, OnInit } from '@angular/core';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {

  constructor(private serv:IsaBackendDataService) { }

  productos:any = [];
  categorys:any = [];
  divisa:boolean = true;
  aux:boolean = false;
  

  ngOnInit() {
    this.getPromo();
  }


  getPromo(){
    this.serv.getPromo().subscribe(
      req => {
        this.productos = req;
      }
    )
  }

  

}
