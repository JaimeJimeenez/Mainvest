import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SellAssetDataService {

  constructor(private httpClient : HttpClient) { }

  sellAsset(idWallet : number, asset : string, amount : number) : Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    
    return this.httpClient.post(`${enviroment.baseUrl}/wallet/sell_asset`, { idWallet, asset, amount }, { headers }).pipe(
      map((apiResponse : any = {}) => {
        const { result } = apiResponse;
        return result.status === 200;
      })
    )
  }
}
