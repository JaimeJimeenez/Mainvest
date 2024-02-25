import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { IAlert, IAlertPrice } from 'src/app/interface/alert/alert';
import { AlertsListDataService } from '../requests/alert/alerts-list-data.service';
import { AlertsEraseDataService } from '../requests/alert/alerts-erase-data.service';
import { AddAlertPriceDataService } from '../requests/alert/add-alert-price-data.service';
import { AlertsPriceListDataService } from '../requests/alert/alerts-price-list-data.service';
import { AlertsPriceUpdateDataService } from '../requests/alert/alerts-price-update-data.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alerts : IAlert[] = [];

  constructor(
    private alertPriceAdd : AddAlertPriceDataService,
    private alertList : AlertsListDataService,
    private alertDelete : AlertsEraseDataService,
    private alertPriceList : AlertsPriceListDataService,
    private alertPriceUpdate : AlertsPriceUpdateDataService
  ) { }

  addAlertPrice(idUser : number, asset : string, price : number) {
    return this.alertPriceAdd.addAlert(idUser, asset, price);
  }

  updateAlertPrice(alertsPrice : IAlertPrice[]) {
    const ids = alertsPrice.map((alert : IAlertPrice) => alert.id);
    return this.alertPriceUpdate.updateAlert(ids);
  }

  getAlerts(id : number) {
    return this.alertList.getAlerts(id);
  }

  getAlertsPrice(id : number) {
    return this.alertPriceList.getAlerts(id);
  }

  deleteAlert(id : number) {
    return this.alertDelete.deleteAlert(id);
  }
}
