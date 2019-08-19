import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { IsaBackendDataService } from './services/isa-backend-data.service';
import { InicioComponent } from './components/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductosComponent } from './components/productos/productos.component';
import { SliderPostComponent } from './components/inicio/slider-post/slider-post.component';
import { FilterPipe } from './pipes/categoryFilter/filter.pipe';
import { DetailComponent } from './components/detail/detail.component';
import { CarComponent } from './components/car/car.component';
import { PagarComponent } from './components/pagar/pagar.component';
import { CategoryPipe } from './pipes/filterCategory2/category.pipe';
import { BsPipe } from './pipes/filterBs/bs.pipe';
import { EditProductComponent } from './components/car/edit-product/edit-product.component';
import { BtnFloatComponent } from './components/btn-float/btn-float.component';
import { TodosComponent } from './components/productos/todos/todos.component';
import { PromocionesComponent } from './components/productos/promociones/promociones.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ProductosComponent,
    SliderPostComponent,
    FilterPipe,
    DetailComponent,
    CarComponent,
    PagarComponent,
    CategoryPipe,
    BsPipe,
    EditProductComponent,
    BtnFloatComponent,
    TodosComponent,
    PromocionesComponent
  ],
  imports: [
    OrderModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [IsaBackendDataService],
  entryComponents: [EditProductComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
