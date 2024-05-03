import { Observable } from "rxjs";

import { Asset } from "../interfaces/market";

export abstract class MarketRepository {
  abstract getTodayAssetsData$(assets: string[]): Observable<Map<string, Asset[]>>;
  abstract getYesterdayAssetsData$(assets: string[]): Observable<Map<string, Asset[]>>;
  abstract getAssetData$(asset: string): Observable<Map<string, Asset[]>>;
}
