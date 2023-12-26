import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EraseAssetDataService {

  constructor(private httpClient : HttpClient) { }

  eraseAsset(idWallet : number, assetName : string) : Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.post(`${enviroment.baseUrl}/asset/erase`, { idWallet, assetName }, { headers }).pipe(
      map((apiResponse : any = {}) => {
        return apiResponse.status === 200;
      })
    )
  }
}
