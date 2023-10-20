import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginDataService } from '../service/requests/auth/login-data.service';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SignupDataService } from '../service/requests/auth/signup-data.service';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    AuthComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
  ],
  providers: [ LoginDataService, SignupDataService ]
})
export class AuthModule { }
