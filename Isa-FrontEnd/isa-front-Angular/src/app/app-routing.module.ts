import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductosComponent } from './components/productos/productos.component';
import { DetailComponent } from './components/detail/detail.component';
import { CarComponent } from './components/car/car.component';
import { PagarComponent } from './components/pagar/pagar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'detalles/:id',
    component: DetailComponent
  },
  {
    path: 'cesta',
    component: CarComponent
  },
  {
    path: 'pagar',
    component: PagarComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
