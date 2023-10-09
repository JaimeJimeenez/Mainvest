import { Component } from '@angular/core';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'mainvest-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(
    private auth : AuthService
  ) {}

  onLogOut() : void {
    this.auth.logout();
  }
}
