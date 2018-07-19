import {Injectable, OnInit, Output, EventEmitter} from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import { Http, RequestOptions,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { Observable } from "rxjs/Rx";
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Router, Route } from '@angular/router';
import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  @Output() loginStatus: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();
  @Output() admin: EventEmitter<any> = new EventEmitter();
  @Output() email: EventEmitter<any> = new EventEmitter();
   login:boolean = false;
   token = '';
   tokenPayload;

  constructor(private http:Http,private route:Router) { 
    
  }

  ngOnInit() {

  }

  reg(email:String,password:String){
   return this.http.post("http://localhost:3000/reg",{ name : email, password: password}).pipe(
     map(res => {
      var response = JSON.parse(res.text()); 
       if(response.success){
         this.route.navigate(['/home']);
       }else{
         this.error.emit(response.message);
       }
     }
   )).subscribe(res =>{
   });     
  }

  log(email:String,password:String){

    let headers = new Headers();
    headers.append('Accept', 'application/json')
    var base64Credential: string = btoa( email+ ':' + password);
    headers.append("Authorization", "Basic " + base64Credential);

    let options = new RequestOptions();
    options.headers=headers;
    return this.http.post("http://localhost:3000/authenticate",{ name : email, password: password})
    .pipe(
      map(res => {
        //alert(res.text());
        var response = JSON.parse(res.text()); 
        if(response.success){
          this.tokenPayload = decode(response.message);          
          localStorage.setItem('user',JSON.stringify({name: email, token: response.message,admin: this.tokenPayload.admin}));
          this.route.navigate(['/home']);
          this.loginStatus.emit(true);
          this.admin.emit(this.tokenPayload.admin);
          this.email.emit(email);
          console.log(JSON.parse(localStorage.getItem('user')).token);
        }else{
          this.error.emit(response.message);
        }
        
        this.token = res.text();
              }) // or any other operator
    )
    .subscribe(res => {
     
    });
   }
 


}
