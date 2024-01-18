import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WalletsByAssetDataService {

  constructor(private httpClient : HttpClient) { }

  getWalletsByAsset(idUser : number, asset : string) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.get(`${enviroment.baseUrl}/wallet/wallets_by_asset/${idUser}/${asset}`, { headers }).pipe(
      map((apiResponse : any = {}) => {
        const { result } = apiResponse;
        return result.data;
      })
    )
  }
}
