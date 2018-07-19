import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated() || !decode(JSON.parse(localStorage.getItem('user')).token).admin) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}