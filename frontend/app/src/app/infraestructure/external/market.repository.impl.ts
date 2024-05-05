import { Injectable } from "@angular/core";

import { MarketRepository } from "src/app/core/repositories/market.repository";
import { Observable } from "rxjs";
import { MarketService } from "src/app/core/services/market.service";
import { Asset } from "src/app/core/interfaces/market";
import { Time } from "src/app/core/libs/time";

@Injectable({
  providedIn: 'root'
})
export class MarketRepositoryImpl extends MarketRepository {

  constructor(private market: MarketService) {
    super();
  }

  override getTodayAssetsData$(assets: string[]): Observable<Map<string, Asset[]>> {
    try {
      if (Time.isMonday()) {
        const saturday: string = Time.getDay(2);
        const friday: string = Time.getDay(3);
        return this.market.getAssetsData$(friday, saturday, assets);
      } else {
        const today: string = Time.getToday();
        const yesterday: string = Time.getYesterday();
        return this.market.getAssetsData$(yesterday, today, assets);
      }
    } catch (error) {
      throw error;
    }
  }

  override getYesterdayAssetsData$(assets: string[]): Observable<Map<string, Asset[]>> {
    try {
      if (Time.isMonday() || Time.isTuesday()) {
        const friday: string = Time.getDay(3);
        const thursday: string = Time.getDay(4);
        return this.market.getAssetsData$(thursday, friday, assets);
      } else {
        const yesterday: string = Time.getYesterday();
        const dayBefore: string = Time.getDayBefore();
        return this.market.getAssetsData$(dayBefore, yesterday, assets);
      }
    } catch (error) {
      throw error;
    }
  }

  override getAssetData$(asset: string): Observable<Map<string, Asset[]>> {
    try {
      const yearBefore: string = Time.getYearBefore();
      const today: string = Time.getToday();
      return this.market.getAssetsData$(yearBefore, today, [asset]);
    } catch (error) {
      throw error;
    }
  }
}
