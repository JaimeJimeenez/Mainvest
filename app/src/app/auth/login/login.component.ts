import { LoginRequestService } from './../../service/requests/login-request.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'mainvest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm : FormGroup;

  constructor(
    private loginRequestService : LoginRequestService
  ) {
    this.loginForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
    })
  }

  onLogin() : void {
    const { username, password } = this.loginForm.value;

    this.loginRequestService.login(username, password).subscribe(
      (success : boolean) => {
        console.log(success);
      }
    )
  }
}
