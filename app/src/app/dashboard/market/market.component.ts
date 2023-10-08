import { Component, inject } from '@angular/core';
import { User } from 'src/app/interface/auth/user.interface';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'mainvest-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent {

  private auth = inject(AuthService);

  public user : User = {
    id: '',
    username: '',
    password: '',
    email: '',
    isActive: false,
    isAdmin: false,
    isAuth: false,
  };

  constructor() {
    this.user = this.auth.user;
    console.log(this.user);
  }


}
