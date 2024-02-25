import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { IAlert } from 'src/app/interface/alert/alert';
import { AlertsListDataService } from '../requests/alert/alerts-list-data.service';
import { AlertsEraseDataService } from '../requests/alert/alerts-erase-data.service';
import { AddAlertPriceDataService } from '../requests/alert/add-alert-price-data.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alerts : IAlert[] = [];

  constructor(
    private alertPriceAdd : AddAlertPriceDataService,
    private alertList : AlertsListDataService,
    private alertDelete : AlertsEraseDataService
  ) { }

  addAlertPrice(idUser : number, asset : string, price : number) {
    return this.alertPriceAdd.addAlert(idUser, asset, price);
  }

  getAlerts(id : number) {
    return this.alertList.getAlerts(id);
  }

  deleteAlert(id : number) {
    return this.alertDelete.deleteAlert(id);
  }
}
