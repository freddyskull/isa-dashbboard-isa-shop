import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: any, category: any): any {
    for (let i = 0; i < category.length; i++) {
      if(value == category[i].id){
        return category[i].nombre;
      }
    }
  }
}
