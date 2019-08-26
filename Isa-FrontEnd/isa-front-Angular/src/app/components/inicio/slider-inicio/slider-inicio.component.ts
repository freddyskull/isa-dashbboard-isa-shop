import { Component, OnInit } from '@angular/core';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';

@Component({
  selector: 'app-slider-inicio',
  templateUrl: './slider-inicio.component.html',
  styleUrls: ['./slider-inicio.component.scss']
})
export class SliderInicioComponent implements OnInit {

  constructor(private serv:IsaBackendDataService) { }

  sliders:any = [];
  titleConfig:any = [];
  subImg:any = [];
  pantalla:number = 0;
  ngOnInit() {
    this.getSlider()
    this.pantalla = window.innerWidth;
  }

  getSlider(){
    this.serv.getsliders().subscribe(
      req => {
        req;
        let j = 0;
        Object(req).forEach(element => {
          this.sliders = JSON.parse(element.slider)
          if(this.titlesConfig != null){
            this.titleConfig = JSON.parse(element.titlesConfig);
          }
          if(this.subImgConfig != null){
            this.subImg = JSON.parse(element.subImgConfig);
          }
        });        
      }
    )
  }

  slider:any = [
    {
      img: 'https://cdn.cjr.org/wp-content/uploads/2019/07/AdobeStock_100000042-e1563305717660-686x371.jpeg',
      title: 'slider',
      subtitle: 'slider-subtitle',
      imgSuper: false,
      titleSuper:true,
      class:'carousel-caption',
      subImg: '',
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
      subImg: '',
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
      subImg: '',
      width: 10,
      alt: ''
    },
  ]

  titlesConfig:any = 
  {
    'background-color': 'rgba(240, 255, 255, 0.479)',
    'color': 'black',
    'bottom': 40 + '%',
    'left': 50 + '%',
    'text-align': 'left'
  }

  subImgConfig:any = {
    'left': 10 + '%',
    'bottom': 40 + '%'
  }

}
