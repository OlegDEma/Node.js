import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

  public users = [];
  public change:boolean = false;
  public changeObject;
  public user_id;
  public i;
  public name = '';
  public admin = '';
  form;

  
    // array of all items to be paged
    items: Array<any>;
 
    // current page of items
    pageOfItems: Array<any>;

  constructor(private http:HttpClient,private adminService:AdminService) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl("",Validators.required),
      admin: new FormControl("",Validators.required)
    });

    this.adminService.getUsers().
    subscribe(
      (data:any[]) =>{
       data.forEach(element => {
         element.change = false;
       });
       this.users = data;
       this.items = data;
      }
    );
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}


  delete(id){
   this.adminService.delete(id).subscribe(
     (res =>{
        if(res['success'] ==  true){
          for(let i = 0;i <= this.pageOfItems.length;i++){
            if(this.pageOfItems[i]._id == id){
              this.pageOfItems.splice(i,1);
              this.onChangePage(this.pageOfItems);
              return;
            }
          }
        }else{
          throw new Error('Error');
        }
     })
   );
}

changeMethod(index,event:Event){
  this.changeObject = this.users[index];
  this.users[index].change = true;
}

saveNewObj(i,event){
  if(this.changeObject.name == '' || this.changeObject.admin == null ){
    alert('ERROR');
  }else{
    if(!(this.changeObject.admin +'' == 'true' || this.changeObject.admin + '' == 'false')){
      alert('ERROR');
    }else{
      this.adminService.updateUser(this.changeObject).subscribe(
        (res =>{
          this.pageOfItems[i].change = false;
          this.pageOfItems[i] = this.changeObject;
          this.pageOfItems[i].change = false;
        })
      );
    }
  }
 
}



}
