import { Component } from '@angular/core';
import { User } from 'src/app/interface/auth/user.interface';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'mainvest-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public isLogIn : boolean = false;
  public user : User;

  constructor(private auth : AuthService) {
    const userLocal = localStorage.getItem('user');
    if (userLocal)
      this.auth.user = JSON.parse(userLocal);
    this.user = this.auth.user;
  }

}
