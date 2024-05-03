import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { WalletsNavComponent } from '../wallets-nav/wallets-nav.component';

@Component({
  selector: 'mainvest-wallets-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WalletsNavComponent],
  templateUrl: './wallets-main.component.html',
  styleUrls: ['./wallets-main.component.scss']
})
export class WalletsMainComponent {

}
