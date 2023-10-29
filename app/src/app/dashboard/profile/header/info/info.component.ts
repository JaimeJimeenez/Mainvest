import { Component, Input } from '@angular/core';
import { User } from 'src/app/interface/auth/user.interface';

@Component({
  selector: 'mainvest-profile-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class ProfileInfoComponent {
  @Input() user : User | null = null;

  constructor() {
    const userLocal = localStorage.getItem('user')
    if (userLocal) {
      const user = JSON.parse(userLocal);
      this.user = user;
    }
  }
}
