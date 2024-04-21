import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LocalStorage } from 'src/app/core/services/localStorage.service';

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

  constructor() {
    this._setHasLogIn();
    this._setProfileLink();
  }

  private _setHasLogIn(): void {
    const token = LocalStorage.getToken();
    this.hasLogIn = token !== null;
  }

  private _setProfileLink() {
    const user = LocalStorage.getUser();
    if (user !== null)
      this.userId = user.id;
  }
}
