import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'mainvest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm : FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
    })
  }

  onLogin() : void {
    if (this.loginForm.valid) {
      console.log('Datos');
      console.log(this.loginForm.value);
    }
  }
}
