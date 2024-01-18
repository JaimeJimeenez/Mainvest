import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAsset } from 'src/app/interface/financial/iAssets';
import { IAssetWallet } from 'src/app/interface/financial/iWallet';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AddAssetsDataService {

  constructor(private httpClient : HttpClient) { }

  addAssetsToWallet(idWallet : number, assets : IAssetWallet[]) : Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${enviroment.baseUrl}/wallet/add_assets`;

    return this.httpClient.post(url, { idWallet, assets }, { headers }).pipe(
      map((apiResponse : any = {}) => {
        const { result } = apiResponse;
        return result !== undefined;
      })
    );
  }
}
