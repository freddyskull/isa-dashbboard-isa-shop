import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-float',
  templateUrl: './btn-float.component.html',
  styleUrls: ['./btn-float.component.scss']
})
export class BtnFloatComponent implements OnInit {

  constructor() { }
  divisa:boolean = false;
  open:boolean = false;
  ngOnInit() {

  }

  @Output()change: EventEmitter<boolean> = new EventEmitter<boolean>();
  divChangeBs() {
    this.divisa = false;
    this.change.emit(this.divisa);
  }
  divChangeDolar() {
    this.divisa = true;
    this.change.emit(this.divisa);
  }
}







