import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';

import { environment } from 'src/environments/environment';
import { Asset, AssetRequest } from '../interfaces/market';
import { MarketMapper } from '../mappers/market.mapper';
import { AssetDTO } from 'src/app/infraestructure/dto/market.dto';
import { ChartAsset } from '../interfaces/chart';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private _url = environment.externalUrl;
  private _headers = environment.headers;

  constructor(private http: HttpClient) { }

  public getAssetsData$(initial_date: string, end_date: string, assets: string[]): Observable<Map<string, Asset[]>> {
    return this.http.get<ApiResponse<AssetDTO>>(
      `${this._url}/financial/assets?asset=${assets}&start=${initial_date}&end=${end_date}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<AssetDTO>) => {
        const { data } = response;
        return MarketMapper.fromAPIToDomain(data, assets);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public getPrediction$(initial_date: string, end_date: string, asset: string): Observable<ChartAsset[]> {
    return this.http.get<ApiResponse<any>>(
      `${this._url}/prediction?asset=${asset}&start=${initial_date}&end=${end_date}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<any>) => {
        const  { data } = response;
        return data.data;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }
}
