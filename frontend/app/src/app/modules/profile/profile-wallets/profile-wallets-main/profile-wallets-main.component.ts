import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileWalletsNavComponent } from '../profile-wallets-nav/profile-wallets-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'mainvest-profile-wallets-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProfileWalletsNavComponent],
  templateUrl: './profile-wallets-main.component.html',
  styleUrls: ['./profile-wallets-main.component.scss']
})
export class ProfileWalletsMainComponent {

}
