import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, obj:any, Usd:number): any {
    let caso:number;
    if(value == 0 && obj.priceS == "0"){
      caso = 0
    }else{
      if(value == 0 && obj.priceSD == "0"){
        caso = 2
      }
      caso = 3;
    }
    switch (caso) {
      case 0:
        return obj.priceSD * Usd
        break;
      case 2:
        return obj.priceS / Usd;
        break
      case 3:
        return value;
        break;
    }
  }

}
