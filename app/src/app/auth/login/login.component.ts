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
    })
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

    this.auth.canLogIn(username, password)
      .then((success) => {
        if (success) this.router.navigate(['/dashboard/market']);
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 2500);
      })
      .catch((error) => console.log(error));
  }
}
