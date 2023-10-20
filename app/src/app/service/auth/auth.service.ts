import { Injectable } from '@angular/core';

import * as bcrypt from 'bcryptjs';

import { User, initUser } from 'src/app/interface/auth/user.interface';
import { LoginDataService } from '../requests/auth/login-data.service';
import { Login } from 'src/app/interface/auth/login.interface';
import { Router } from '@angular/router';
import { SignupDataService } from '../requests/auth/signup-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user : User  = initUser;

  constructor(
    private loginData : LoginDataService,
    private signUpData : SignupDataService,
    private router : Router,
  ) { }

  get user() : User {
    return this._user;
  }

  set user(user : User) {
    this._user = user;
  }

  setLocalStorage(data : Login) {
    const { user, token } = data;
    this._user = user;
    this._user.isAuth = true;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  canLogIn(username : string, password : string) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.loginData.verifyUser(username)
        .then((response : Login) => {
          if (response.user && bcrypt.compareSync(password, response.user.password)) {
            this.setLocalStorage(response);
            resolve(true);
          }
          resolve(false);
        })
        .catch((error) => reject(error));
    });
  }

  signUp(username : string, password : string, email : string) : Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.signUpData.signUp(username, bcrypt.hashSync(password, 10), email)
        .then((response : Login) => {
          if (!response.token.length)
            resolve(false);
          this.setLocalStorage(response);
          resolve(true);
        })
        .catch((error) => reject(false));
    })
  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._user = initUser;
    this.router.navigate(['/dashboard/market']);
  }
}
