import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login:boolean = false;
  admin:boolean = false;
  email = '';

  constructor(private loginService:LoginService,private route:Router) {
      this.loginService.loginStatus.subscribe(log =>{
          this.login = log;
      });
      this.loginService.admin.subscribe(a =>{
        this.admin = a;
    });
    this.loginService.email.subscribe(email =>{
      this.email = email;
    });
   }

  ngOnInit() {
    if(!localStorage.getItem("user")){
      this.login = false;
      this.admin = false;
     }else if(JSON.parse(localStorage.getItem('user')).token == ''){
       this.login = false;
       this.admin = false;
     }else if(JSON.parse(localStorage.getItem('user')).token != ''){
       this.login = true;
       if(decode(JSON.parse(localStorage.getItem('user')).token).admin){
        this.admin = true;
      }
       
     }
  }


  logout(){
    localStorage.removeItem('user');
    this.admin = false;
    this.email = '';
    this.ngOnInit();
    this.route.navigate(['home']);
  }

}
