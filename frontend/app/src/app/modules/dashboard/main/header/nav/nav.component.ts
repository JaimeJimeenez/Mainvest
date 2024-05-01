import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MAIN_ROUTES } from 'src/app/const/main.routes';
import { SubmenuModel } from 'src/app/core/models/submenu.model';

@Component({
  selector: 'mainvest-header-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(public submenu: SubmenuModel) {
    this.submenu.submenuOptions = MAIN_ROUTES;
  }
}
