import { Injectable } from '@angular/core';
import { IAsset } from 'src/app/interface/financial/iAssets';

@Injectable({
  providedIn: 'root'
})
export class FinancialAssetsService {
  private _assetsPeriod : Map<string, IAsset[]>;
  private _assetsWeekly : Map<string, IAsset>

  constructor() {
    this._assetsPeriod = new Map<string, IAsset[]>;
    this._assetsWeekly = new Map<string, IAsset>;
  }

  get assetsPeriod() : Map<string, IAsset[]> {
    return this._assetsPeriod;
  }

  set assetsPeriod(assetsPeriod : Map<string, IAsset[]>) {
    this._assetsPeriod = assetsPeriod;
  }
  get assetsWeekly() : Map<string, IAsset> {
    return this._assetsWeekly;
  }

  set assetsWeekly(assetsWeekly : Map<string, IAsset>) {
    this._assetsWeekly = assetsWeekly;
  }

}
