import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProfileNavComponent } from '../../profile/profile-nav/profile-nav.component';
import { SocialNavComponent } from '../social-nav/social-nav.component';

@Component({
  selector: 'mainvest-social-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProfileNavComponent, SocialNavComponent],
  templateUrl: './social-main.component.html',
  styleUrls: ['./social-main.component.scss']
})
export class SocialMainComponent {

}
