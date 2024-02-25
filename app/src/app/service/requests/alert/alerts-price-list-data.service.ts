import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AlertsPriceListDataService {

  constructor(private httpClient : HttpClient) { }

  getAlerts(idUser : number) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`${enviroment.baseUrl}/alert/price/list/${idUser}`, { headers }).pipe(
      map((response : any) => response.data)
    )
  }
}
