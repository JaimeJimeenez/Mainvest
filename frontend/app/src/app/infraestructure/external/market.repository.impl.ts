import { Injectable } from "@angular/core";

import { MarketRepository } from "src/app/core/repositories/market.repository";
import { Observable } from "rxjs";
import { FinancialService } from "src/app/core/services/financial.service";
import { Asset, AssetRequest } from "src/app/core/interfaces/market";
import { Time } from "src/app/core/libs/time";


@Injectable({
  providedIn: 'root'
})
export class MarketRepositoryImpl extends MarketRepository {

  constructor(private financial: FinancialService) {
    super();
  }

  override getTodayAssetsData$(assets: string[]): Observable<Map<string, Asset[]>> {
    try {
      const today = Time.getToday();
      const yesterday = Time.getYesterday();
      const assetsRequest: AssetRequest = {
        initial_date: yesterday,
        end_date: today,
        assets
      };
      return this.financial.getAssetsData$(assetsRequest);
    } catch (error) {
      throw error;
    }
  }

  override getYesterdayAssetsData$(assets: string[]): Observable<Map<string, Asset[]>> {
    try {
      const yesterday = Time.getYesterday();
      const dayBeforeYesterday = Time.getDayBefore();
      const assetsRequest: AssetRequest = {
        initial_date: dayBeforeYesterday,
        end_date: yesterday,
        assets
      };
      return this.financial.getAssetsData$(assetsRequest);
    } catch (error) {
      throw error;
    }
  }

}
