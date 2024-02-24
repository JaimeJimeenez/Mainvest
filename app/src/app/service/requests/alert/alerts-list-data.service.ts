import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AlertsListDataService {

  constructor(private httpClient : HttpClient) { }

  getAlerts(idUser : number) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`${enviroment.baseUrl}/alert/list/${idUser}`, { headers }).pipe(
      map((response : any) => response.data)
    )
  }
}
