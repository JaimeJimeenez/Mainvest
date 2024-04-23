import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LocalStorage } from 'src/app/core/libs/local.storage';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'mainvest-header-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public hasLogIn: boolean = false;
  public userId: number = 0;

  constructor(private user: UserService) {
    this._updateLoginStatus();
  }

  private _updateLoginStatus(): void {
    this.userId = this.user.getUserId();
    this.hasLogIn = this.user.isUserLoggedIn();
  }
}
