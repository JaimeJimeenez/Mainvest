import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DeleteAlertPriceDataService {

  constructor(private httpClient : HttpClient) { }

  eraseAlert(id : number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(`${enviroment.baseUrl}/alert/price/delete`, { id }, { headers }).pipe(
      map((response : any) => response.data)
    )
  }
}
