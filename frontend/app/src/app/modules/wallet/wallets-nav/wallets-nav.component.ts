import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';

import { Subscription } from 'rxjs';

import { PROFILE_WALLETS_ROUTES } from 'src/app/const/profile/profile-wallets.routes';
import { SubmenuModel } from 'src/app/core/models/submenu.model';

import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchObservableService } from 'src/app/core/services/observables/search-observable.service';

@Component({
  selector: 'mainvest-wallets-nav',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wallets-nav.component.html',
  styleUrls: ['./wallets-nav.component.scss'],
  providers: [SubmenuModel]
})
export class WalletsNavComponent {
  @Input() _idUser: number = 0;
  public searchForm: FormGroup;

  private _subscriptionUserId: Subscription;

  constructor(public submenu: SubmenuModel,private _userId: UserIdObservableService, private searchObservable: SearchObservableService) {
    this.submenu.submenuOptions = PROFILE_WALLETS_ROUTES;

    this._subscriptionUserId = this._userId.userId$.subscribe((userId: number) => {
      this._idUser = userId;
      this._setIdsRoutes();
    });

    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required])
    });

    this.searchForm.valueChanges.subscribe(
      (searchValue) => {
        const { search } = this.searchForm.controls;
        this.searchObservable.sendSearch(search.value);
      }
    )
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
