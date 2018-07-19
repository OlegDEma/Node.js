import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users = [];
  public change:boolean = false;
  public changeObject;
  form;

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
      }
    );
  }

  delete(id,index){
   this.adminService.delete(id,index).subscribe(
     (res =>{
        if(res['success'] ==  true){
          this.users.splice(index,1);
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

saveNewObj(index,event){
  console.log(this.changeObject);
  if(this.changeObject.name != '' && this.changeObject.admin != '' && (this.changeObject.admin == 'true' || this.changeObject.admin == 'false')){
    this.adminService.updateUser(this.changeObject).subscribe(
      (res =>{
        console.log(res);
        this.users[index].change = false;
        this.users[index] = this.changeObject;
        this.change = false;
      })
    );
  }else{
    alert('ERROR');
  }
 
}

}
