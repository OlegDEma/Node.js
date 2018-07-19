import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions,Response,Headers } from '@angular/http';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { Observable } from "rxjs/Rx";
import 'rxjs/Rx';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

   email = '';
   password = '';
   login:boolean = false;
   token = '';

  constructor(private http:Http) { 
    
  }

  ngOnInit() {
    if(!localStorage.getItem("user")){
      this.login = false;
     }else if(JSON.parse(localStorage.getItem('user')).token == ''){
       this.login = false;
     }else if(JSON.parse(localStorage.getItem('user')).token != ''){
       this.login = true;
     }
  }

  reg(){
   return this.http.post("http://localhost:3000/reg",{ name : this.email, password: this.password}).subscribe(
     (response:Response) =>{
       console.log(response);
       this.email = '';
       this.password = '';
     }
   );     
  }

  log(){

    let headers = new Headers();
    headers.append('Accept', 'application/json')
    var base64Credential: string = btoa( this.email+ ':' + this.password);
    headers.append("Authorization", "Basic " + base64Credential);

    let options = new RequestOptions();
    options.headers=headers;
    return this.http.post("http://localhost:3000/authenticate",{ name : this.email, password: this.password})
    .pipe(
      map(res => {
        //alert(res.text());
        localStorage.setItem('user',JSON.stringify({name: this.email, token: res.text()}));
        this.token = res.text();
              }) // or any other operator
    )
    .subscribe(res => this.ngOnInit());
   }
 



}
