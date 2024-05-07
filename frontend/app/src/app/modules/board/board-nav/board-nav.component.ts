import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmenuModel } from 'src/app/core/models/submenu.model';
import { BOARD_ROUTES } from 'src/app/const/board.routes';
import { Route } from 'src/app/core/interfaces/common';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';

@Component({
  selector: 'mainvest-board-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-nav.component.html',
  styleUrls: ['./board-nav.component.scss']
})
export class BoardNavComponent {
  private _userId: number = 0;

  constructor(public submenu: SubmenuModel, private userIdObservable: UserIdObservableService) {
    this.submenu.submenuOptions = BOARD_ROUTES;
    this.userIdObservable.userId$.subscribe((id: number) => {
      this._userId = id;
      this._addIdToRoutes();
    });
  }

  private _addIdToRoutes(): void {
    this.submenu.submenuOptions = BOARD_ROUTES.map(route => ({ ...route }));
    this.submenu.submenuOptions.forEach((route: Route) => route.path += `/${this._userId}`);
  }
}
