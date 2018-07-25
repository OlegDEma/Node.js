import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  reverse:boolean = false;
  order = 'name';
   p = 1;
   products = [];

  constructor(private adminService:AdminService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.adminService.getProducts().subscribe(
      (res:any[]) =>{
        this.products = res;
      }
    );
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
  }, 500);
}

sort(value){
  if(value == 1){
    this.order = 'price';
    this.reverse = false;
  }else if(value == 2){
    this.order = 'price';
    this.reverse = true;
  }else{
    this.order = 'name';
    this.reverse = false;
  }
}
  

}
