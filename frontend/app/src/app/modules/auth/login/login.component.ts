import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogIn } from 'src/app/core/interfaces/auth';

import { LocalStorage } from 'src/app/core/libs/local.storage';


import { AuthRepositoryImpl } from 'src/app/infraestructure/data/repositories/auth.repository.impl';

@Component({
  standalone: true,
  selector: 'mainvest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
  public loginForm: FormGroup;
  public showAlert: boolean = false;
  public errorInfo: string = '';

  constructor(private authRepository: AuthRepositoryImpl) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberUser: new FormControl(false),
    });

    const rememberedUser: LogIn | undefined = LocalStorage.getRememberedUser();
    if (rememberedUser !== undefined)
      this._setLoginForm(rememberedUser);
  }

  private _setLoginForm(user: LogIn) {
    this.loginForm.patchValue({ username: user.username });
    this.loginForm.patchValue({ password: user.password });
    this.loginForm.patchValue({ rememberUser: true });
  }

  async onSubmit() {
    const { username, password, rememberUser } = this.loginForm.value;

    try {
      await this.authRepository.logIn(username, password, rememberUser);
    } catch (error: any) {
      this.errorInfo = error.message;
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 2500);
    }
  }
}
