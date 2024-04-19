import { Injectable } from '@angular/core';

import { SignUp } from '../interfaces/user/signup';
import { AuthRepository } from '../../infraestructure/data/repositories/auth.repository';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authRepository: AuthRepository) { }

  async signUp(email: string, name: string, username: string, password: string) {
    try {
      const newUser: SignUp = { email, name, username, password };
      const user = await lastValueFrom(this.authRepository.signUp(newUser));
    } catch (error : any) {
      throw error;
    }
    return true;
  }
}
