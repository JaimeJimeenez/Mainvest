import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MAIN_ROUTES } from 'src/app/const/main.routes';
import { SubmenuModel } from 'src/app/core/models/submenu.model';
import { LocalStorage } from 'src/app/core/libs/local.storage';
import { User } from 'src/app/core/interfaces/user';
import { Route } from 'src/app/core/interfaces/common';

@Component({
  selector: 'mainvest-header-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(public submenu: SubmenuModel) {
    this.submenu.submenuOptions = MAIN_ROUTES;
    this._addIdToRoutes();
  }

  private _addIdToRoutes(): void {
    const user : User | undefined = LocalStorage.getUser();
    if (user !== undefined) {
      const id = user.id;
      this.submenu.submenuOptions = MAIN_ROUTES.map(route => ({ ...route }));
      this.submenu.submenuOptions.forEach((route: Route) => route.path += `/${id}`);
    }
  }
}
