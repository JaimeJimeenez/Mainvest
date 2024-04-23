import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { profileRoutes } from 'src/app/const/profile.routes';
import { Username } from 'src/app/core/interfaces/user';
import { Route } from 'src/app/core/interfaces/common';
import { SubmenuModel } from 'src/app/core/models/submenu.model';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { UserRepositoryImpl } from 'src/app/infraestructure/data/repositories/user.repository.impl';


@Component({
  selector: 'mainvest-profile-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss'],
  providers: [SubmenuModel]
})
export class ProfileNavComponent {

  private _subscriptionUserId: Subscription;
  private _idUser: number = 0;

  constructor(
    public submenu: SubmenuModel,
    private _userId: UserIdObservableService,
    private userRepository: UserRepositoryImpl
  ) {
    this.submenu.submenuOptions = profileRoutes;

    this._subscriptionUserId = this._userId.userId$.subscribe((userId: number) => {
      this._idUser = userId;
      this._setIdsRoutes();
      this._setUsername();
    });
  }

  private async _setUsername() {
    const data: Username = await lastValueFrom(this.userRepository.getUsername$(this._idUser));
    const username: string = data.username;
    this.submenu.submenuOptions[0].label = username;
  }

  private _setIdsRoutes(): void {
    this.submenu.submenuOptions = profileRoutes.map(route => ({ ...route }));
    this.submenu.submenuOptions.forEach((route: Route) => route.path += `/${this._idUser}`);
  }

  ngOnDestroy(): void {
    this._subscriptionUserId.unsubscribe();
  }
}
