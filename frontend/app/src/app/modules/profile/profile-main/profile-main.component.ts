import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ProfileNavComponent } from '../profile-nav/profile-nav.component';

@Component({
  selector: 'mainvest-profile-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProfileNavComponent],
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent {}
