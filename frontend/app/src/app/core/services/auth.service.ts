import { Injectable } from '@angular/core';

import { SignUp } from '../interfaces/user/signup';
import { AuthRepository } from '../../infraestructure/data/repositories/auth.repository';
import { lastValueFrom } from 'rxjs';
import { Login } from '../interfaces/user/login';
import { LocalStorage } from './localStorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authRepository: AuthRepository, private router: Router) { }

  async signUp(email: string, name: string, username: string, password: string) {
    try {
      const newUser: SignUp = { email, name, username, password };
      const user = await lastValueFrom(this.authRepository.signUp$(newUser));
      LocalStorage.saveUser(user);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      throw error;
    }
  }

  async logIn(username: string, password: string, rememberUser: boolean) {
    try {
      const loginUser: Login = { username, password };
      const user = await lastValueFrom(this.authRepository.logIn$(loginUser));
      LocalStorage.saveUser(user);
      if (rememberUser)
        LocalStorage.saveRememberUser(loginUser);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      throw error;
    }
  }
}
