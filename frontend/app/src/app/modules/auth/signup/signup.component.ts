import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthRepositoryImpl } from 'src/app/infraestructure/data/repositories/auth.repository.impl';

@Component({
  standalone: true,
  selector: 'mainvest-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class SignupComponent {
  signUpForm: FormGroup;
  errorInfo: string = '';
  showAlert: boolean = false;

  constructor(private authRepository: AuthRepositoryImpl) {
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
      await this.authRepository.signUp(email, name, username, password);
    } catch (error: any) {
      this.errorInfo = error.message;
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 2500);
    }
  }
}
