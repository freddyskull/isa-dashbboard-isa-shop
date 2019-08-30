import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dasboard-list-product',
  templateUrl: './dasboard-list-product.component.html',
  styleUrls: ['./dasboard-list-product.component.scss']
})
export class DasboardListProductComponent implements OnInit {

  constructor(private serv: ProductService) { }
  filter:string = "";
  categorys:any = [];
  products:any = [];
  categoryId:number = 0;
  length:number = 0;
  selectedOptions:any = [];
  list:any = [];
  todos:boolean = false;
  @Input() dataDashboard;
  @Input() Usd;
  @Output() productSend = new EventEmitter<any>();
  ngOnInit() {
    this.getCategorys()
  }

  selectAll(list){
    this.todos =! this.todos;
    if(this.todos){
      list.selectAll();
    }else{
      list.deselectAll();
    }
  }
  
  selectCategory(e){
    this.getList(this.categoryId);
  }

  getCategorys(){
    this.serv.getCategorys().subscribe(
      req => {
        this.categorys = req;
      }
    )
  }
  
  add(){
    // document.getElementById('list').classList.remove('fadeIn');
    // document.getElementById('list').classList.add('fadeOut');
    this.list = this.selectedOptions;
    this.productSend.emit(this.list);
    this.todos = false;
  }

  getList(item){
    // document.getElementById('list').classList.remove('d-none');
    // document.getElementById('list').classList.remove('fadeOut');
    // document.getElementById('list').classList.add('fadeIn');
    this.products = [];
    this.serv.getProducts().subscribe(
      req => {
        Object(req).forEach(element => {
          if(element.category == item){
            this.products.push(element);
          }
        });
        this.length = Object.keys(this.products).length
      }
    )
  }
  

  todo = [
    {name:'Get to work'},
    {name:'Pick up groceries'},
    {name:'Go home'},
    {name:'Fall asleep'}
  ];

  done = [
    {name:'Get up'},
    {name:'Brush teeth'},
    {name:'Take a shower'},
    {name:'Check e-mail'},
    {name:'Walk dog'}
  ];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


}
