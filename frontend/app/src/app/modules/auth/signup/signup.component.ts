import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'mainvest-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup;
  errorInfo: string = '';
  showAlert: boolean = false;

  constructor(private auth: AuthService) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      name: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      email: new FormControl('', [ Validators.required, Validators.email]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    });
  }

  async onSubmit() {
    const { username, name, email, password } = this.signUpForm.value;
    
    try {
      const signedUp = await this.auth.signUp(email, name, username, password);
      // Redirect to main window
    } catch (error : any) {
      this.errorInfo = error.message;
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 2500);
    }
  }
}
