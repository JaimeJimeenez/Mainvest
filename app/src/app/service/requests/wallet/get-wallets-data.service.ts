import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GetWalletsDataService {

  constructor(private httpClient : HttpClient) { }

  getWallets(idUser : number) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.get(`${enviroment.baseUrl}/wallet/list/${idUser}`, { headers }).pipe(
      map((response : any = {}) => {
        return response.data;
      })
    )
  }
}
