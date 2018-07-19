import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email = '';
  password = '';
  error = '';
  form;

  constructor(private loginService:LoginService) {
    this.loginService.error.subscribe(res =>{
        this.error = res;
    });
   }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      password: new FormControl("",Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$')
      ]))
    });
  }

  register(){
      this.loginService.reg(this.email,this.password);
  }

}
