import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { ASSETS } from 'src/app/const/financial_assets';

import { ROUTES } from 'src/app/const/routes';
import { IAlert, IAlertPrice } from 'src/app/interface/alert/alert';
import { User } from 'src/app/interface/auth/user.interface';
import { AlertService } from 'src/app/service/alert/alert.service';

import { AuthService } from 'src/app/service/auth/auth.service';
import { AlertNumberObservableService } from 'src/app/service/observables/alert/alert-number-observable.service';

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
  public numberOfAlerts : number = 0;

  constructor(
    private auth : AuthService,
    private router : Router,
    private numberAlertsObservable : AlertNumberObservableService,
    private alert : AlertService
  ) {
    const userLocal = localStorage.getItem('user');
    if (userLocal)
      this.auth.user = JSON.parse(userLocal);
    this.user = this.auth.user;
    this.searchForm = new FormGroup({
      search : new FormControl('')
    });
    this.numberAlertsObservable.numberAlertData$.subscribe((value) => this._getNumberOfAlerts());
    this._getNumberOfAlerts();
  }

  private _getNumberOfAlerts() : void {
    (async() => {
      this.user = this.auth.user;
      let alerts = await lastValueFrom(this.alert.getAlerts(+this.user.id))
      if (alerts !== undefined) {
        alerts = alerts.filter((alert : IAlert) => !alert.read);
        this.numberOfAlerts = alerts.length;
      }
      let alertsPrice = await lastValueFrom(this.alert.getAlertsPrice(+this.user.id));
      alertsPrice = alertsPrice.filter((alert : IAlertPrice) => alert.reached);
      this.numberOfAlerts += alertsPrice.length;
    })();
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

  goToAlerts() : void {
    this.router.navigate([`/dashboard/alerts/list/${this.user.id}`]);
  }
}
