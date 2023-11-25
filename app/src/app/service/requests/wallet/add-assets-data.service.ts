import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAsset } from 'src/app/interface/financial/iAssets';
import { IAssetWallet } from 'src/app/interface/financial/iWallet';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AddAssetsDataService {

  constructor(private httpClient : HttpClient) { }

  addAssetsToWallet(idWallet : number, assets : IAssetWallet[]) : Promise<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post(`${enviroment.baseUrl}/wallet/add_assets`, { idWallet, assets }, { headers }).subscribe(
        (apiResponse : any) => {
          const { result } = apiResponse;
          if (result)
            resolve(true);
          else resolve(false);
        }
      )
    });
  }
}
