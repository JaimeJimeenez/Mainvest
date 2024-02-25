import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ASSETS } from 'src/app/const/financial_assets';
import { IAlertPrice } from 'src/app/interface/alert/alert';

import { IAsset } from 'src/app/interface/financial/iAssets';
import { FinancialAsset } from 'src/app/lib/financial_asset';
import { AlertService } from 'src/app/service/alert/alert.service';
import { DateService } from 'src/app/service/common/date.service';
import { AlertNumberObservableService } from 'src/app/service/observables/alert/alert-number-observable.service';
import { FinancialAssetsDataService } from 'src/app/service/requests/common/financial-assets-data.service';

@Component({
  selector: 'mainvest-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  assets : any[] = [];
  actualAsset : Map<string, IAsset[]> = new Map<string, IAsset[]>;

  constructor(
    private date : DateService,
    private financialAssetsData : FinancialAssetsDataService,
    private alerts : AlertService,
    private numberOfAlertsObservable : AlertNumberObservableService,
    private router : Router
  ) {
    this._getAssets();
  }

  private async _getAssets() {
    const today = this.date.getDays();
    const dataAssets = await lastValueFrom(this.financialAssetsData.getFinancialAssets(
      ASSETS,
      today.firstDay,
      today.lastDay
    ));
    this.actualAsset = FinancialAsset.convertFinancialAsset(dataAssets);
    const oldDays = this.date.getOlderDays();
    const oldDataAssets = await lastValueFrom(this.financialAssetsData.getFinancialAssets(
      ASSETS,
      oldDays.firstDay,
      oldDays.lastDay
    ))
    const assetsOlder = FinancialAsset.convertFinancialAsset(oldDataAssets);
    this._parseAssets(assetsOlder);
    this._getAlertsPrice();
  }

  private _getAssetEvolution(actualValue : number, oldValue : number) : number {
    return 100 - (actualValue * 100 / oldValue);
  }

  private _parseAssets(oldAssets : Map<string, IAsset[]>) {
    this.actualAsset.forEach((value : IAsset[], key : string) => {
      this.assets.push({
        name : key,
        info : value[0],
        change : this._getAssetEvolution(value[0].adj_close, oldAssets.get(key)![0].adj_close)
      })
    });
  }

  private async _updateAlertsPrice(alertsPrice : IAlertPrice[]) {
    alertsPrice = alertsPrice.filter((alert : IAlertPrice) => alert.reached);
    await lastValueFrom(this.alerts.updateAlertPrice(alertsPrice))
    this.numberOfAlertsObservable.numberOfAlerts(alertsPrice.length);
  }

  private async _getAlertsPrice() {
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const user = JSON.parse(userLocal);
      const alertsPrice : IAlertPrice[] = await lastValueFrom(this.alerts.getAlertsPrice(user.id));
      alertsPrice.forEach((alert : IAlertPrice) => {
        const assetData = this.actualAsset.get(alert.asset);
        if (assetData) {
          const price = assetData[0].adj_close;
          if (alert.price <= price)
            alert.reached = true;
        }
      });
      this._updateAlertsPrice(alertsPrice)
    }
  }

  getAssetInfo(name : string) : void {
    this.router.navigate([`/dashboard/market/${name}`]);
  }
}
