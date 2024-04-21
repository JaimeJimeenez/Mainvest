import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from 'src/app/core/interfaces/common/route';

import { profileRoutes } from 'src/app/const/profile.routes';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { LocalStorage } from 'src/app/core/services/localStorage.service';
import { User } from 'src/app/core/interfaces/client/client';

@Component({
  selector: 'mainvest-profile-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent {
  routes: Route[] = profileRoutes;

  private _idUser: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const data = params.get('id');
      if (data !== null) {
        this._idUser = +data;
        this._setIdsRoutes();
        this._setUsername();
      }
    });
  }

  private _setUsername(): void {
    const user: User | null = LocalStorage.getUser();
    if (user !== null) {
      this.routes[0].label = user.username;
      if (user.id === this._idUser) {
        this.routes.slice(1, undefined);
      }
    }
  }

  private _setIdsRoutes(): void {
    this.routes.forEach((route: Route) => route.path += `/${this._idUser}`);
  }
}
