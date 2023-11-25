import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';
import { DateService } from '../../common/date.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialAssetsDataService {
  private _url : string = '';

  constructor(private httpClient : HttpClient, private date : DateService) { }

  getFinancialAssets(symbol : string[], start : string, end : string) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this._url = `${enviroment.baseFinancial}financial_assets?asset=${symbol}&start=${start}&end=${end}`;

    return this.httpClient.get(this._url, {headers, withCredentials: true}).pipe(
      map((response : any) => {
        return response.data;
      })
    )
  }
}
