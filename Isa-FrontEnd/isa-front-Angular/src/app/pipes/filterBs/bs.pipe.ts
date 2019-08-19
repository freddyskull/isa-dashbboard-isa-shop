import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bs'
})
export class BsPipe implements PipeTransform {

  transform(value: any,stock?:number, tipo?:boolean ): any {
    if(value == 0){
      return "0"
    }else{
      if(stock > 0 ){
        if(tipo == true){
          return (Math.trunc(Math.trunc(value) * 1.10) * stock).toLocaleString() + ",00";  
        }else{
          return (Math.trunc(value) * stock).toLocaleString() + ",00";
        }
      }else{
        if(tipo == true){
           return (Math.trunc(Math.trunc(value) * 1.10)).toLocaleString() + ",00"; 
        }else{
          return Math.trunc(value).toLocaleString() + ",00";
        }
      }
    }
  }

}
