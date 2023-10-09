import { Injectable } from '@angular/core';

import * as bcrypt from 'bcryptjs';

import { User, initUser } from 'src/app/interface/auth/user.interface';
import { LoginDataService } from '../requests/auth/login-data.service';
import { Login } from 'src/app/interface/auth/login.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user : User  = initUser;

  constructor(
    private loginData : LoginDataService,
    private router : Router,
  ) { }

  get user() : User {
    return this._user;
  }

  set user(user : User) {
    this._user = user;
  }

  canLogIn(username : string, password : string) : Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.loginData.verifyUser(username)
        .then((response : Login) => {
          const { user, token } = response;
          console.log(user);
          if (response && bcrypt.compareSync(password, user.password)) {
            this.user = user;
            this._user.isAuth = true;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            resolve(true);
          }
          resolve(false);
        })
        .catch((error) => reject(error));
    });
  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._user = initUser;
    this.router.navigate(['/dashboard/market']);
  }
}
