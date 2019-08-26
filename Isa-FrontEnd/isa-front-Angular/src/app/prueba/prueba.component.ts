import { Component, OnInit } from '@angular/core';
import { Slider } from '../models/sliderModel';
import { IsaBackendDataService } from '../services/isa-backend-data.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  constructor(private serv:IsaBackendDataService) { }

  slider:string = '';
  ngOnInit() {
    this.enviar.slider = JSON.stringify(this.result)
    this.serv.addSlider(this.enviar).subscribe(
      req => {
        console.log(req)
      }
    )
  }

  enviar:any = {
    slider: ''
  }
  result:any = [
    {
      img: 'https://cdn.cjr.org/wp-content/uploads/2019/07/AdobeStock_100000042-e1563305717660-686x371.jpeg',
      title: 'slider',
      subtitle: 'slider-subtitle',
      imgSuper: false,
      titleSuper:true,
      class:'carousel-caption',
      width: 10,
      alt: ''
    },
    {
      img: 'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
      title: 'slider2',
      subtitle: 'slider-subtitle',
      imgSuper: true,
      titleSuper:true,
      class:'carousel-caption-01',
      width: 10,
      alt: ''
    },
    {
      img: 'https://i.ytimg.com/vi/YUDes_czZ3M/maxresdefault.jpg',
      title: 'slider3',
      subtitle: 'slider-subtitle',
      imgSuper: true,
      titleSuper:true,
      class:'carousel-caption-01',
      width: 10,
      alt: ''
    }
   ]



}
