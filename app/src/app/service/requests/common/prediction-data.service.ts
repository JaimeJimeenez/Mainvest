import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PredictionDataService {
  private _url : string = '';

  constructor(private httpClient : HttpClient) { }

  getPrediction(symbol : string, start : string, end : string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this._url = `${enviroment.baseFinancial}prediction?asset=${symbol}&start=${start}&end=${end}`;

    return this.httpClient.get(this._url, {headers, withCredentials: true}).pipe(
      map((response : any) => {
        return response.data;
      })
    )
  }
}
