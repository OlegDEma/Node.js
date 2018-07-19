import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import {FormMoule} from '@angular/forms';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuardService as AuthGuard, AuthGuardService } from './services/AuthGuardService';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from 'src/app/services/login.service';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',      component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  {path:'header', component:HeaderComponent},
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard]},
  {path:'**',redirectTo:'home'}
];



@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
  ],
  providers: [LoginService,AuthGuard,AuthService,JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
