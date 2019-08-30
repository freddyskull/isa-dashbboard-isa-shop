import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.scss']
})
export class StoreProductsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StoreProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }


  ngOnInit() {

  }


  delete(item:any){
    for(let i = 0; i < this.data.length; i++){
      if(item == this.data[i]){
        this.data.splice(i,1);
      }
    }
  }

}
