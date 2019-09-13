import { Component, HostListener, Inject, NgModule, OnInit, SimpleChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy,  PopStateEvent  } from '@angular/common';
import { CartService } from './services/addCart/cart.service';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'isa-front-Angular';
  carLength: number = 0;
  show: boolean = false;
  sticky: boolean = false;
  mobil: boolean = false;
  private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
  routes: any = [
    {
      name: 'Inicio',
      rout: '/inicio'
    },
    {
      name: 'Tienda',
      rout: '/productos'
    }
  ]
  location: Location;
  constructor(private cart: CartService, location: Location, private rout:Router) { this.location = location; }
  ngOnInit() {
    if (window.innerWidth < 767) {
      this.mobil = true;
    }
    this.location.subscribe((ev:PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
  });
  this.rout.events.subscribe((ev:any) => {
      if (ev instanceof NavigationStart) {
          if (ev.url != this.lastPoppedUrl)
              this.yScrollStack.push(window.scrollY);
      } else if (ev instanceof NavigationEnd) {
          if (ev.url == this.lastPoppedUrl) {
              this.lastPoppedUrl = undefined;
              window.scrollTo(0, this.yScrollStack.pop());
          } else
              window.scrollTo(0, 0);
      }
  });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  onActivate() {
    let aux = false
    if(aux){
      window.scrollTo(0,0)
    }
  }
  click() {
    const btn = document.getElementById("menu-toggle");
    const lines = btn.querySelectorAll(".line");
    const cls = { open: "open", close: "close" };
    let btnClass = cls.open;


    // btn.classList.remove(btnClass);
    // btnClass = cls.close;

    // btn.classList.remove(btnClass);
    btnClass = cls.open;
    // btn.addEventListener("click", () => {
    //   if (btn.classList.contains(cls.open)) {
    //     btn.classList.remove(btnClass);
    //     btnClass = cls.close;
    //   } else if (btn.classList.contains(cls.close)) {
    //     btn.classList.remove(btnClass);
    //     btnClass = cls.open;
    //   }

    void btn.offsetWidth;
    btn.classList.add(btnClass);


  }

  cartLength() {
    if (localStorage.getItem('cart') != null) {
      let lenght = Object.keys(this.cart.getproducts()).length
      this.carLength = Object.keys(lenght).length;
      if (this.carLength > 0) {
        this.show == true;
      }
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (!this.mobil) {
      let element = document.getElementById('navbar')
      const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (offset > 400) {
        this.sticky = true;
        element.classList.remove("fadeOutUp");
        element.classList.add("fadeInDown");

      } else {
        element.classList.remove("fadeInDown");
        element.classList.add("fadeOutUp");
      }
      if (offset < 10) {
        this.sticky = false;
        element.classList.remove("fadeOutUp");
        element.classList.add("fadeInDown");
      }
    }
  }


}
