import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() {
    this.sliders = [
      {
      img: 'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg'
      }
    ]
   }

  ngOnInit() {
    this.lengthSlider = Object.keys(this.sliders).length
  }
  lengthSlider:number = 0;
  sliders:any = [];
  sli:any = {
    img:        '',
    title:      '',
    subtitle:   '',    
    imgSuper:   false,
    titleSuper: false,
    subImg:    '',
    class:      '',
    width:      0,
    alt:        '',
  }

  addSliders(){
    this.sliders.push(this.sli);
    console.log(this.sliders)
  }

  // reset(){
  //   this.slider.img        = '';
  //   this.slider.title      = '';
  //   this.slider.subtitle   = '';    
  //   this.slider.imgSuper   = false;
  //   this.slider.titleSuper = false;
  //   this.slider.subImg     ='';
  //   this.slider.class      = '';
  //   this.slider.width      = 0;
  //   this.slider.alt        = '';
  // }
}
