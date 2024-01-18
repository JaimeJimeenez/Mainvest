import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UpdateAssetDataService {

  constructor(private httpClient : HttpClient) { }

  updateAsset(idWallet : number, asset : string, amount : number) : Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.post(`${enviroment.baseUrl}/wallet/update_asset`, { idWallet, asset, amount }, { headers }).pipe(
      map((apiResponse : any = {}) => {
        const { result } = apiResponse;
        return result.status === 200;
      })
    )
  }
}
