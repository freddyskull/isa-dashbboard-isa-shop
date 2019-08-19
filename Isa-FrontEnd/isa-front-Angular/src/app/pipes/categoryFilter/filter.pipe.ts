import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: number ): any {
    if(args == 0 ){
      return value;
    }
    if(args > 0){
      let newArr:any = [];
      for (let i = 0; i < value.length; i++) {
        if(args == value[i].category_id ){
          newArr.push(value[i])
        } 
      }
      return newArr;
    }
  }

}
