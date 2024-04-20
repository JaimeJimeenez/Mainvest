import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Login } from 'src/app/core/interfaces/user/login';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorage } from 'src/app/core/services/localStorage.service';

@Component({
  standalone: true,
  selector: 'mainvest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  public loginForm: FormGroup;
  public showAlert: boolean = false;
  public errorInfo: string = '';

  constructor(private auth: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberUser: new FormControl(false),
    });

    const rememberedUser: Login | undefined = LocalStorage.getRememberedUser();
    if (rememberedUser !== undefined)
      this._setLoginForm(rememberedUser);
  }

  private _setLoginForm(user: Login) {
    this.loginForm.patchValue({ username: user.username });
    this.loginForm.patchValue({ password: user.password });
    this.loginForm.patchValue({ rememberUser: true });
  }

  async onSubmit() {
    const { username, password, rememberUser } = this.loginForm.value;

    try {
      await this.auth.logIn(username, password, rememberUser );
    } catch (error: any) {
      this.errorInfo = error.message;
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 2500);
    }
  }
}
