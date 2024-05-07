import { Observable } from "rxjs";

import { Asset } from "../interfaces/market";
import { ChartAsset } from "../interfaces/chart";

export abstract class MarketRepository {
  abstract getTodayAssetsData$(assets: string[]): Observable<Map<string, Asset[]>>;
  abstract getYesterdayAssetsData$(assets: string[]): Observable<Map<string, Asset[]>>;
  abstract getAssetData$(asset: string): Observable<Map<string, Asset[]>>;
  abstract getPrediction$(asset: string): Observable<ChartAsset[]>;
}
