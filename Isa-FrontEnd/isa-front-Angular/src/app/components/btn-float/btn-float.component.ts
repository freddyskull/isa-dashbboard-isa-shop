import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IsaBackendDataService } from 'src/app/services/isa-backend-data.service';

@Component({
  selector: 'app-btn-float',
  templateUrl: './btn-float.component.html',
  styleUrls: ['./btn-float.component.scss']
})
export class BtnFloatComponent implements OnInit {

  constructor(private serv:IsaBackendDataService) { }
  divisa:boolean = false;
  open:boolean = false;
  click:boolean = true;
  ngOnInit() {
    if(sessionStorage.getItem("btn") == null ||sessionStorage.getItem("btn") == undefined){
      this.getButtonStatus()    
    }else{
      this.click = JSON.parse(sessionStorage.getItem("btn"))
    }
  }

  getButtonStatus(){
    sessionStorage.setItem("btn", JSON.stringify(this.click))
  }
  @Output()change: EventEmitter<boolean> = new EventEmitter<boolean>();
  divChangeBs() {
    this.divisa = false;
    this.change.emit(this.divisa);
    this.serv.openDialog("La divisa ha sido cambiada a Bolivares","Ok")
  }
  divChangeDolar() {
    this.divisa = true;
    this.change.emit(this.divisa);
    this.serv.openDialog("La divisa ha sido cambiada a Dolares","Ok")
  }
}







