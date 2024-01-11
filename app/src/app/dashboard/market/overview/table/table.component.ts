import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ASSETS } from 'src/app/const/financial_assets';

import { IAsset } from 'src/app/interface/financial/iAssets';
import { FinancialAsset } from 'src/app/lib/financial_asset';
import { DateService } from 'src/app/service/common/date.service';
import { FinancialAssetsDataService } from 'src/app/service/requests/common/financial-assets-data.service';

@Component({
  selector: 'mainvest-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  assets : any[] = [];

  constructor(
    private date : DateService,
    private financialAssetsData : FinancialAssetsDataService,
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
    const assetsToday = FinancialAsset.convertFinancialAsset(dataAssets);
    console.log(assetsToday);
    const oldDays = this.date.getOlderDays();
    const oldDataAssets = await lastValueFrom(this.financialAssetsData.getFinancialAssets(
      ASSETS,
      oldDays.firstDay,
      oldDays.lastDay
    ))
    const assetsOlder = FinancialAsset.convertFinancialAsset(oldDataAssets);
    console.log(assetsOlder);
    this._parseAssets(assetsToday, assetsOlder);
  }

  private _getAssetEvolution(actualValue : number, oldValue : number) : number {
    return 100 - (actualValue * 100 / oldValue);
  }

  private _parseAssets(actualAsset : Map<string, IAsset[]>, oldAssets : Map<string, IAsset[]>) {
    actualAsset.forEach((value : IAsset[], key : string) => {
      this.assets.push({
        name : key,
        info : value[0],
        change : this._getAssetEvolution(value[0].adj_close, oldAssets.get(key)![0].adj_close)
      })
    });
  }

  getAssetInfo(name : string) : void {
    this.router.navigate([`/dashboard/market/${name}`]);
  }
}
