import { Component, OnInit } from '@angular/core';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';

@Component({
  selector: 'app-slider-post',
  templateUrl: './slider-post.component.html',
  styleUrls: ['./slider-post.component.scss']
})
export class SliderPostComponent implements OnInit {

  constructor(private serv: IsaBackendDataService) { }
  products:any = [];
  ngOnInit() {
    this.serv.getProducts().subscribe(
      req => {
        for (let i = 0; i < 15; i++) {
          let randomItem = Object(req)[Math.random() * Object(req).length | 0];
          this.products.push(randomItem)
        }
      }
    )
  }

// var names = personas.map(function (person) { return person.name; });
// var sorted = names.sort();

// var unique = sorted.filter(function (value, index) {
//     return value !== sorted[index + 1];
// });


}
