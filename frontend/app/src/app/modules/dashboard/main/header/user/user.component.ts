import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LocalStorage } from 'src/app/core/libs/local.storage';
import { UserService } from 'src/app/core/services/user.service';
import { SubmenuModel } from 'src/app/core/models/submenu.model';
import { DropdownProfileRoutes } from 'src/app/const/dropdown.profile.routes';
import { Route } from 'src/app/core/interfaces/common';

@Component({
  selector: 'mainvest-header-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [SubmenuModel]
})
export class UserComponent {
  public hasLogIn: boolean = false;
  public userId: number = 0;

  constructor(private user: UserService, public submenu: SubmenuModel) {
    this._updateLoginStatus();
    this.submenu.submenuOptions = DropdownProfileRoutes;
    this._setIdsRoutes();
  }

  private _updateLoginStatus(): void {
    this.userId = this.user.getUserId();
    this.hasLogIn = this.user.isUserLoggedIn();
  }

  private _setIdsRoutes(): void {
    this.submenu.submenuOptions = DropdownProfileRoutes.map(route => ({...route}));
    this.submenu.submenuOptions.forEach((route: Route) => route.path += `/${this.userId}`);
  }
}
