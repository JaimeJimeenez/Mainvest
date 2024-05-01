import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmenuModel } from 'src/app/core/models/submenu.model';
import { BOARD_ROUTES } from 'src/app/const/board.routes';

@Component({
  selector: 'mainvest-board-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-nav.component.html',
  styleUrls: ['./board-nav.component.scss']
})
export class BoardNavComponent {
  constructor(public submenu: SubmenuModel) {
    this.submenu.submenuOptions = BOARD_ROUTES;
  }
}
