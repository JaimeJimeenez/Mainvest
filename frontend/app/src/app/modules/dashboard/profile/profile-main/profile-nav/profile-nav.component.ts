import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';

import { profileRoutes } from 'src/app/const/profile.routes';
import { User } from 'src/app/core/interfaces/user';
import { LocalStorage } from 'src/app/core/libs/local.storage';
import { Route } from 'src/app/core/interfaces/common';
import { SubmenuModel } from 'src/app/core/models/submenu.model';


@Component({
  selector: 'mainvest-profile-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent {

  private _idUser: number = 0;

  constructor(private route: ActivatedRoute, public submenuModel: SubmenuModel) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const data = params.get('id');
      if (data !== null) {
        this._idUser = +data;
        this.submenuModel.submenuOptions = profileRoutes;
        this._setIdsRoutes();
        this._setUsername();
      }
    });
  }

  private _setUsername(): void {
    const user: User | undefined = LocalStorage.getUser();
    if (user !== undefined) {
      this.submenuModel.submenuOptions[0].label = user.username;
      if (user.id !== this._idUser) {
        this.submenuModel.submenuOptions.slice(1, undefined);
      }
    }
  }

  private _setIdsRoutes(): void {
    this.submenuModel.submenuOptions.forEach((route: Route) => route.path += `/${this._idUser}`);
  }
}
