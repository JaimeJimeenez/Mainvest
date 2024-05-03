import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';

import { Subscription } from 'rxjs';

import { PROFILE_WALLETS_ROUTES } from 'src/app/const/profile/profile-wallets.routes';
import { SubmenuModel } from 'src/app/core/models/submenu.model';

import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';

@Component({
  selector: 'mainvest-profile-wallets-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-wallets-nav.component.html',
  styleUrls: ['./profile-wallets-nav.component.scss'],
  providers: [SubmenuModel]
})
export class ProfileWalletsNavComponent {
  @Input() _idUser: number = 0;

  private _subscriptionUserId: Subscription;

  constructor(public submenu: SubmenuModel,private _userId: UserIdObservableService) {
    this.submenu.submenuOptions = PROFILE_WALLETS_ROUTES;

    this._subscriptionUserId = this._userId.userId$.subscribe((userId: number) => {
      this._idUser = userId;
      this._setIdsRoutes();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['_idUser']) {
      this._idUser = changes['_idUser'].currentValue;
      this._setIdsRoutes();
    }
  }

  private _setIdsRoutes(): void {
    this.submenu.submenuOptions = PROFILE_WALLETS_ROUTES.map(route => ({ ...route }));
    this.submenu.submenuOptions.forEach((route: Route) => route.path += `/${this._idUser}`);
  }

  ngOnDestroy(): void {
    this._subscriptionUserId.unsubscribe();
  }
}
