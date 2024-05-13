import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LogIn, SignUp } from 'src/app/core/interfaces/auth';
import { LocalStorage } from 'src/app/core/libs/local.storage';

import { AuthRepository } from 'src/app/core/repositories/auth.repository';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryImpl extends AuthRepository {

  constructor(private auth: AuthService, private router: Router) {
    super();
  }

  override async signUp(email: string, name: string, username: string, password: string): Promise<void> {
    try {
      const newUser: SignUp = { email, name, username, password };
      const user = await lastValueFrom(this.auth.signUp$(newUser));
      LocalStorage.saveUser(user);
      this.router.navigate([`/dashboard/market/home/${user.id}`]);
    } catch (error: any) {
      throw error;
    }
  }

  override async logIn(username: string, password: string, rememberUser: boolean) {
    try {
      const loginUser: LogIn = { username, password };
      const user = await lastValueFrom(this.auth.logIn$(loginUser));
      LocalStorage.saveUser(user);
      if (rememberUser)
        LocalStorage.saveRememberUser(loginUser);
      this.router.navigate([`/dashboard/market/home/${user.id}`]);
    } catch (error: any) {
      throw error;
    }
  }
}
