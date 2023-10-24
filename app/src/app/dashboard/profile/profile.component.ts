import { Component, Input } from '@angular/core';
import { User, initUser } from 'src/app/interface/auth/user.interface';
import { IMenuOptions } from 'src/app/interface/iMenuOptions';

@Component({
  selector: 'mainvest-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() user : User | null = null;
  public isMyProfile : boolean = true;
  public menuOptions : IMenuOptions[] = [
    {
      text: 'Publicaciones',
      icon: 'fa-solid fa-comment'
    },
    {
      text: 'Carteras compartidas',
      icon: 'fa-solid fa-share',
    },
    {
      text: 'Me gusta',
      icon: 'fa-solid fa-heart',
    }
  ];

  constructor() {
    const userLocal = localStorage.getItem('user')
    if (userLocal) {
      const user = JSON.parse(userLocal);
      this.user = user;
      this.menuOptions.splice(1, 0, { text: 'Mis carteras', icon: 'fa-solid fa-wallet' });
    }
  }

  onSubmenuSelected(option : number) : void {
    console.log(option);
  }
}
