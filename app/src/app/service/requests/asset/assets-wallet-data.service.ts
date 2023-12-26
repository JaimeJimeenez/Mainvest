import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AssetsWalletDataService {

  constructor(private httpClient : HttpClient) { }

  getAssets(idWallet : number) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.get(`${enviroment.baseUrl}/wallet/assets_wallet/${idWallet}`).pipe(
      map((response : any = {}) => response.data)
    )
  }
}
