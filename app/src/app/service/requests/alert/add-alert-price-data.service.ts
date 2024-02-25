import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AddAlertPriceDataService {

  constructor(private httpClient : HttpClient) { }

  addAlert(idUser : number, asset : string, price : number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(`${enviroment.baseUrl}/alert/price/add`, { idUser, asset, price }, { headers }).pipe(
      map((response : any) => response.data)
    )
  }
}
