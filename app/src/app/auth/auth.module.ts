import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginDataService } from '../service/requests/auth/login-data.service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AuthComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  providers: [ LoginDataService ]
})
export class AuthModule { }
