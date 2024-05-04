import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmenuModel } from 'src/app/core/models/submenu.model';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { Route } from 'src/app/core/interfaces/common';
import { NOTIFICATION_ROUTES } from 'src/app/const/notification.routes';

@Component({
  selector: 'mainvest-notification-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-nav.component.html',
  styleUrls: ['./notification-nav.component.scss'],
  providers: [SubmenuModel]
})
export class NotificationNavComponent {
  private _idUser: number = 0;

  constructor(public submenu: SubmenuModel, private userIdObservable: UserIdObservableService) {
    this.submenu.submenuOptions = NOTIFICATION_ROUTES;
    
    this.userIdObservable.userId$.subscribe((id: number) => {
      this._idUser = id;
      this._setIdsRoutes();
    })
  }

  private _setIdsRoutes(): void {
    this.submenu.submenuOptions = NOTIFICATION_ROUTES.map(route => ({ ...route }));
    this.submenu.submenuOptions.forEach((route: Route) => route.path += `/${this._idUser}`)
  }
}
