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
  public hasLogIn : boolean = false;

  constructor() {
    this._setHasLogIn();
  }

  private _setHasLogIn(): void {
    const token = LocalStorage.getToken();
    if (token !== null) this.hasLogIn = true;
    else this.hasLogIn = false;
  }
}
