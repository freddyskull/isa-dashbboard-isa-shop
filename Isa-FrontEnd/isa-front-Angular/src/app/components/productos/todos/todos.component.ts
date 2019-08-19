import { Component, OnInit } from '@angular/core';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(private serv:IsaBackendDataService) { }

  productos:any = [];
  categorys:any = [];
  divisa:boolean = true;
  aux:boolean = false;
  category:number = 0;

  ngOnInit() {
    this.getProduct();
    this.getCategorys();
  }


  getProduct(){
    this.serv.getProducts().subscribe(
      req => {
        this.productos = req;
      }
    )
  }

  getCategorys(){
    this.serv.getCategorys().subscribe(
      req => {
        this.categorys = req;
      }
    )
  }

}
