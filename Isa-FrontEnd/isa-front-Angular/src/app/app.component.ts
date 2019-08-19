import { Component, OnInit } from '@angular/core';
import { CartService } from './services/addCart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'isa-front-Angular';
  carLength:number = 0;
  show:boolean = false;

  constructor(private cart:CartService){}
  ngOnInit(){
    
  }

  cartLength(){
    if(localStorage.getItem('cart') != null){
      let lenght = Object.keys(this.cart.getproducts()).length
      this.carLength = Object.keys(lenght).length;
      if(this.carLength > 0){
        this.show == true;
      }
    }
  }

  images = [1, 2, 3].map(() => `https://picsum.photos/600/200?random&t=${Math.random()}`);
}
