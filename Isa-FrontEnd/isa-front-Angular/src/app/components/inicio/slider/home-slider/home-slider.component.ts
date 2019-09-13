import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
declare var jQuery:any;
@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit {
  location: Location;
  constructor(private rout: Router,location: Location) { this.location = location; }

  ngOnInit() {
	if(this.location.path() === '/inicio'){
		this.init()
	}
  }
  

  route(){
    this.rout.navigate(['/productos']);
  }

init(){
  var	revapi1, tpj;
  tpj = jQuery; 
  jQuery(function() {
		revapi1 = tpj("#rev_slider_1_1").show().revolution({
			jsFileLocation:"./assets/js/",
			sliderLayout:"fullwidth",
			visibilityLevels:"1240,1024,778,480",
			gridwidth:1200,
			gridheight:600,
			minHeight:"",
			spinner:"spinner7",
			spinnerclr:"#f29d00",
			editorheight:"600,768,960,720",
			responsiveLevels:"1240,1024,778,480",
			navigation: {
				arrows: {
					enable:true,
					style:"uranus",
					left: {
						container:"layergrid",
						h_offset:0
					},
					right: {
						container:"layergrid",
						h_offset:0
					}
				}
			},
			fallbacks: {
				allowHTML5AutoPlayOnAndroid:true
			},
		});
		}
	  );
    }

}
