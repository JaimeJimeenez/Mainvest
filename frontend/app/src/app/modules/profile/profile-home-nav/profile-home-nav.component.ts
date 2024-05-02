import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route } from '@angular/router';

import { Subscription } from 'rxjs';

import { PROFILE_HOME_ROUTES } from 'src/app/const/profile-home.routes';
import { SubmenuModel } from 'src/app/core/models/submenu.model';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';

@Component({
  standalone: true,
  selector: 'mainvest-profile-home-nav',
  imports: [CommonModule],
  templateUrl: './profile-home-nav.component.html',
  styleUrls: ['./profile-home-nav.component.scss'],
  providers: [SubmenuModel]
})
export class ProfileHomeNavComponent {

  private _subscriptionUserId: Subscription;
  private _idUser: number = 0;

  constructor(public submenu: SubmenuModel,private _userId: UserIdObservableService) {
    this.submenu.submenuOptions = PROFILE_HOME_ROUTES;

    this._subscriptionUserId = this._userId.userId$.subscribe((userId: number) => {
      this._idUser = userId;
      this._setIdsRoutes();
    });
  }

  private _setIdsRoutes(): void {
    this.submenu.submenuOptions = PROFILE_HOME_ROUTES.map(route => ({ ...route }));
    this.submenu.submenuOptions.forEach((route: Route) => route.path += `/${this._idUser}`);
  }

  ngOnDestroy(): void {
    this._subscriptionUserId.unsubscribe();
  }
}
