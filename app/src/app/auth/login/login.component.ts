import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'mainvest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm : FormGroup;
  public showAlert : boolean = false;

  constructor(
    private router : Router,
    private auth : AuthService
  ) {
    this.loginForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      rememberUser : new FormControl(false),
    })
    if (localStorage.getItem('rememberedUser'))
      this._setLoginForm();
  }

  private _setLoginForm() : void {
    const { username, password }= JSON.parse(this._getUserInLocalStorage());
    this.loginForm.patchValue({ username : username });
    this.loginForm.patchValue({ password : password });
    this.loginForm.patchValue({ rememberUser : true });
  }

  private _getUserInLocalStorage() : any {
    return localStorage.getItem('rememberedUser');
  }

  private _setUserToLocalStorage(username : string, password : string) : void {
    localStorage.setItem('rememberedUser', JSON.stringify({username, password}));
  }

  private _removeUserInLocalStorage() : void {
    if (localStorage.getItem('rememberedUser'))
      localStorage.removeItem('rememberedUser');
  }

  onSubmit() {
    const { username, password, rememberUser } = this.loginForm.value;

    this.auth.canLogIn(username, password)
      .then((success) => {
        if (success) {
          if (rememberUser) this._setUserToLocalStorage(username, password);
          else this._removeUserInLocalStorage();
          this.router.navigate(['/dashboard/market']);
        }
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 2500);
      })
      .catch((error) => console.log(error));
  }
}
