import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Route } from '@angular/router';

import { Subscription } from 'rxjs';

import { SOCIAL_ROUTES } from 'src/app/const/social.routes';
import { SubmenuModel } from 'src/app/core/models/submenu.model';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';

@Component({
  standalone: true,
  selector: 'mainvest-profile-home-nav',
  imports: [CommonModule],
  templateUrl: './social-nav.component.html',
  styleUrls: ['./social-nav.component.scss'],
  providers: [SubmenuModel]
})
export class SocialNavComponent {
  @Input() _idUser: number = 0;

  private _subscriptionUserId: Subscription;

  constructor(public submenu: SubmenuModel,private _userId: UserIdObservableService) {
    this.submenu.submenuOptions = SOCIAL_ROUTES;

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
    this.submenu.submenuOptions = SOCIAL_ROUTES.map(route => ({ ...route }));
    this.submenu.submenuOptions.forEach((route: Route) => route.path += `/${this._idUser}`);
  }

  ngOnDestroy(): void {
    this._subscriptionUserId.unsubscribe();
  }
}
