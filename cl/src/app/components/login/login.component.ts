import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  er:boolean = false;
  error = '';

  constructor(private loginService:LoginService) {
    this.loginService.error.subscribe(er =>{
      this.er = true;
        this.error = er;
    });
 }
  ngOnInit() {
  }

  login(){
    this.loginService.log(this.email,this.password);
  }
}
