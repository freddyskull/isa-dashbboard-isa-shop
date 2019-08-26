import { Component, OnInit } from '@angular/core';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';
import { MatDialog } from '@angular/material/dialog';
import { BtnComprarComponent } from '../../../dialog/btn-comprar/btn-comprar.component';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(private serv:IsaBackendDataService, private dialog: MatDialog) { }

  productos:any = [];
  categorys:any = [];
  divisa:boolean = false;
  aux:boolean = false;
  category:number = 0;

  ngOnInit() {
    this.getProduct();
    this.getCategorys();
  }


  divisaChange(e){
    this.divisa = e;
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(BtnComprarComponent, {
      width: '450px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      
      
    });
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
