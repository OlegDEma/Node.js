import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem('user');
    // Check whether the token is expired and return
    // true or false
    return jwtHelper.isTokenExpired(JSON.parse(token).token);
  }
}