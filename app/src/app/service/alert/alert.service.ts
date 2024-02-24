import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { IAlert } from 'src/app/interface/alert/alert';
import { AlertsListDataService } from '../requests/alert/alerts-list-data.service';
import { AlertsEraseDataService } from '../requests/alert/alerts-erase-data.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alerts : IAlert[] = [];

  constructor(
    private alertList : AlertsListDataService,
    private alertDelete : AlertsEraseDataService
  ) { }

  getAlerts(id : number) {
    return this.alertList.getAlerts(id);
  }

  deleteAlert(id : number) {
    return this.alertDelete.deleteAlert(id);
  }
}
