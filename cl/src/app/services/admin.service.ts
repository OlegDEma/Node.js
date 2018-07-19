import {Injectable, OnInit, Output, EventEmitter} from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/Rx';
import { Http, RequestOptions,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { Observable } from "rxjs/Rx";
import 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { Router, Route } from '@angular/router';
import decode from 'jwt-decode';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit {
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  @Output() users: EventEmitter<any> = new EventEmitter();


  constructor(private http:Http,private httpClient:HttpClient,private route:Router) { 
    
  }

  ngOnInit() {  
   
 
  }

  getToken(){   
    return JSON.parse(localStorage.getItem('user')).token;
  }

  getUsers(){
    return this.http.get("http://localhost:3000/users").pipe(
      map((res:any) => {
        return res.json();
      }));
  }

  delete(id,index){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': this.getToken()
      })
    };

    return this.httpClient.post('http://localhost:3000/api/delete',{id:id}, httpOptions).pipe(
      map(res => {  
       return res;        
      }
    ));     
}

updateUser(u){
  let httpOptions = {
    headers: new HttpHeaders({
      'x-access-token': this.getToken()
    })
  };
console.log(u);
  return this.httpClient.post('http://localhost:3000/api/updateUser',{user:{_id:u._id,name:u.name,password:u.password,admin:u.admin}}, httpOptions).pipe(
    map(res => {  
     return res;        
    }
  ));     
}

}


