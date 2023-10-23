import { Component, OnInit } from '@angular/core';

import { ROUTES } from 'src/app/const/routes';
import { User } from 'src/app/interface/auth/user.interface';

import { AuthService } from 'src/app/service/auth/auth.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'mainvest-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public user : User;

  public routes = ROUTES;

  constructor(private auth : AuthService) {
    const userLocal = localStorage.getItem('user');
    if (userLocal)
      this.auth.user = JSON.parse(userLocal);
    this.user = this.auth.user;
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
