import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IAlert, IAlertPrice } from 'src/app/interface/alert/alert';
import { AlertService } from 'src/app/service/alert/alert.service';
import { AlertDeleteObservableService } from 'src/app/service/observables/alert/alert-delete-observable.service';
import { AlertNumberObservableService } from 'src/app/service/observables/alert/alert-number-observable.service';

@Component({
  selector: 'mainvest-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss']
})
export class AlertsListComponent {
  private idUser : number = 0;
  private options : boolean[] = [false, true];
  private _alertsData : IAlert[] = [];

  public alerts : IAlert[] = [];
  public isComment : boolean = true;
  public alertsPrice : IAlertPrice[] = [];
  public isAlertPrice : boolean = false;

  constructor(
    private activatedRoute : ActivatedRoute,
    private alert : AlertService,
    private alertDeleteObservable : AlertDeleteObservableService,
    private numberAlertsObservable : AlertNumberObservableService
  ) {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      this.idUser = +params.get('id')!;
      this._alertsData = await lastValueFrom(this.alert.getAlerts(this.idUser));
      this.alertsPrice = await lastValueFrom(this.alert.getAlertsPrice(this.idUser));
      this.alertsPrice = this.alertsPrice.filter((alert : IAlertPrice) => alert.reached);
      this._filterAlerts(0);
    });

    this.alertDeleteObservable.alertData$.subscribe((id : number) => this.eraseAlert(id));
  }

  private _updateSubmenu(selected : number) : void {
    const options = document.getElementsByClassName('list--options')[0];
    if (options) {
      const elements = options.querySelectorAll('div')
      elements.forEach((element) => element.classList.remove('selected'));
      const element : Element = elements[selected];
      if (element)
        element.classList.add('selected');
    }
  }

  private _filterAlerts(selected : number) : void {
    if (this._alertsData !== undefined)
      this.alerts =
        this._alertsData.filter((alert : IAlert) => alert.liked == this.options[selected]);
  }

  onSelectedOption(selected : number) : void {
    this._updateSubmenu(selected);
    this._filterAlerts(selected);
    if (this.alerts.length !== 0)
      this.isComment = !this.alerts[0].liked;
    this.isAlertPrice = selected === 2;
  }

  eraseAlert(id : number) : void {
    (async() => {
      await lastValueFrom(this.alert.deleteAlert(id));
    })();
    this._alertsData = this._alertsData.filter((alert : IAlert) => alert.id !== id);
    this.alerts = this.alerts.filter((alert : IAlert) => alert.id !== id);
    this.numberAlertsObservable.numberOfAlerts(this._alertsData.length);
  }
}
