import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';

import { environment } from 'src/environments/environment';
import { Asset, AssetRequest } from '../interfaces/market';
import { MarketMapper } from '../mappers/market.mapper';
import { AssetDTO } from 'src/app/infraestructure/dto/market.dto';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  private _url = environment.externalUrl;
  private _headers = environment.headers;

  constructor(private http: HttpClient) { }

  public getAssetsData$(assetsRequest: AssetRequest): Observable<Map<string, Asset[]>> {
    const { initial_date, end_date, assets } = assetsRequest;
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
}
