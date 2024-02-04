import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ASSETS } from 'src/app/const/financial_assets';

import { ROUTES } from 'src/app/const/routes';
import { User } from 'src/app/interface/auth/user.interface';

import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'mainvest-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public searchForm : FormGroup;
  public user : User;
  public assets = ASSETS;
  public searchTerm : any;
  public routes = ROUTES;
  public placeholderText: string = "Buscar";

  constructor(
    private auth : AuthService,
    private router : Router
  ) {
    const userLocal = localStorage.getItem('user');
    if (userLocal)
      this.auth.user = JSON.parse(userLocal);
    this.user = this.auth.user;
    this.searchForm = new FormGroup({
      search : new FormControl('')
    });
  }

  onSubmit() : void {
    const { search } = this.searchForm.value;
    this.router.navigate([`/dashboard/market/${search}`])
  }

  onSelectionChange(event: any) {
    this.placeholderText = event ? "" : "Buscar";
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    if (
      document.activeElement &&
      document.activeElement.tagName.toLowerCase() === 'input' &&
      this.searchForm.valid
    ) {
      this.onSubmit();
    }
  }
}
