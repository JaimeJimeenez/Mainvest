import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PROFILE_ROUTES } from 'src/app/const/profile/profile.routes';
import { User, Username } from 'src/app/core/interfaces/user';
import { Route } from 'src/app/core/interfaces/common';
import { SubmenuModel } from 'src/app/core/models/submenu.model';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { UserRepositoryImpl } from 'src/app/infraestructure/data/repositories/user.repository.impl';
import { LocalStorage } from 'src/app/core/libs/local.storage';
import { SocialRepositoryImpl } from 'src/app/infraestructure/data/repositories/social.repository.impl';


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

  public isUserProfile: boolean = true;
  public isFollowing: boolean = false;

  constructor(
    public submenu: SubmenuModel,
    private _userId: UserIdObservableService,
    private socialRepository: SocialRepositoryImpl,
    private userRepository: UserRepositoryImpl
  ) {
    this.submenu.submenuOptions = PROFILE_ROUTES;

    this._subscriptionUserId = this._userId.userId$.subscribe((userId: number) => {
      this._idUser = userId;
      this._setIdsRoutes();
      this._setUsername();
      this._checkProfile();
      this._isFollowingUser();
    });
  }

  private _checkProfile(): void {
    const user: User | undefined = LocalStorage.getUser();
    if (user !== undefined && user.id !== this._idUser) {
      this.submenu.submenuOptions = this.submenu.submenuOptions.slice(0, -1);
      this.isUserProfile = false;
    } else {
      this.isUserProfile = true;
    }
  }

  private async _setUsername() {
    const data: Username = await lastValueFrom(this.userRepository.getUsername$(this._idUser));
    const username: string = data.username;
    this.submenu.submenuOptions[0].label = username;
  }

  private _setIdsRoutes(): void {
    this.submenu.submenuOptions = PROFILE_ROUTES.map(route => ({ ...route }));
    this.submenu.submenuOptions.forEach((route: Route) => route.path += `/${this._idUser}`)
  }

  private async _isFollowingUser(): Promise<void> {
    try {
      const user: User | undefined = LocalStorage.getUser();
      if (user !== undefined) {
        const data = await lastValueFrom (this.socialRepository.getUserFollowings$(user.id));
        const findIndex = data.findIndex((followings) => this._idUser === followings.id);
        this.isFollowing = findIndex !== -1;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async onFollowUser(): Promise<void> {
    try {
      const user: User | undefined = LocalStorage.getUser();
      if (user !== undefined) {
        this.isFollowing = await lastValueFrom (this.socialRepository.followUser$(user.id, this._idUser));
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async unFollowUser(): Promise<void> {
    try {
      const user: User | undefined = LocalStorage.getUser();
      if (user !== undefined) {
        await lastValueFrom (this.socialRepository.unfollowUser$(user.id, this._idUser));
        this.isFollowing = false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  ngOnDestroy(): void {
    this._subscriptionUserId.unsubscribe();
  }
}
