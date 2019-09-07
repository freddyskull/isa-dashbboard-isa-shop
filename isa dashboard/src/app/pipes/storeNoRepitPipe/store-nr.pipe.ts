import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'storeNR'
})
export class StoreNRPipe implements PipeTransform {

  transform(value: any, dashProduct?: any): any {
    // elemento.id_isa_backend
    for (let i = 0; i < dashProduct.length; i++) {   
      for (let j = 0; j < value.length; j++) {
        console.log(dashProduct[i])     
      }
    }
  }

}
