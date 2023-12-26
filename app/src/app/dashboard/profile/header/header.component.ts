import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User, initUser } from 'src/app/interface/auth/user.interface';
import { IRoutes } from 'src/app/interface/main/iRoutes';
import { ROUTES_PROFILES } from 'src/app/const/routes';
import { MoneyService } from 'src/app/service/user/money.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'mainvest-profile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() user : User | null = null;
  public isUsersProfile : boolean = false;
  public menuOptions : IRoutes[] = [];
  public profileOptions : IRoutes[] = [];
  public usersMoney : number = 0;

  constructor(private router : Router, private money : MoneyService) {
    this._initializeData();
  }

  private async _initializeData() {
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const user = JSON.parse(userLocal);
      this.user = user;
      this.isUsersProfile = true;
    }

    this.menuOptions = ROUTES_PROFILES;
    if (this.isUsersProfile) {
      this._assignMenuOptions();
      this._assignUsersOptions();
      await this._getUsersMoney();
    } else this._assignFollowersOptions();
  }

  private _assignMenuOptions() : void {
    const user : IRoutes = {
      label : this.user!.username,
      icon: 'fa-solid fa-user',
      path: '/dashboard/profile/posts',
    };
    const myWallets : IRoutes = {
      label: 'Mis carteras',
      icon: 'fa-solid fa-wallet',
      path: '/dashboard/profile/wallets/'
    };
    if (this.menuOptions.length !== 5) {
      this.menuOptions.unshift(user);
      this.menuOptions.splice(2, 0, myWallets);
    }
  }

  private _assignUsersOptions() : void {
    this.profileOptions = [
      {
        path: '/dashboard/profile/settings',
        label: '',
        icon: 'fa fa-solid fa-gear',
      }
    ];
  }

  private _assignFollowersOptions() : void {
    this.profileOptions = [
      {
        path: '',
        label: 'Follow',
        icon: '',
      }
    ]
  }

  private async _getUsersMoney() {
    const { id } = this.user!;
    this.usersMoney = await firstValueFrom(this.money.getMoney(+id));
  }

  onSubmenuSelected(option : number) : void {
    if (option !== 5)
      this.router.navigate([this.menuOptions[option].path]);
    else if (this.isUsersProfile)
      this.router.navigate(['/dashboard/profile/settings']);
    // TODO Add follows option
  }
}
