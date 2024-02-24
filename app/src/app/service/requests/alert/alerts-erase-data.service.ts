import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AlertsEraseDataService {

  constructor(private httpClient : HttpClient) { }

  deleteAlert(id : number) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(`${enviroment.baseUrl}/alert/delete`, { id }, { headers }).pipe(
      map((response : any) => response.data)
    )
  }
}
