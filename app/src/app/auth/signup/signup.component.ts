import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'mainvest-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public showAlert : boolean = false;
  public signUpForm : FormGroup;
  public errorInfo : string = '';

  constructor(
    private auth : AuthService,
    private router : Router,
  ) {
    this.signUpForm = new FormGroup({
      username : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      name : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      email : new FormControl('', [ Validators.required, Validators.email]),
      password : new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    });
  }

  onSubmit() {
    const { username, name, password, email } = this.signUpForm.value;

    this.auth.signUp(username, name, password, email)
      .then((success) => {
        if (success) this.router.navigate(['dashboard/market']);
        if (!success) {
          this.errorInfo = 'El nombre de usuario o email ya existe.';
          this.showAlert = true;
          setTimeout(() => this.showAlert = false, 2500);
        }
      })
      .catch((error) => {
        this.errorInfo = 'Algún campo no cumple con los requisitos';
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 2500);
      });
  }
}
