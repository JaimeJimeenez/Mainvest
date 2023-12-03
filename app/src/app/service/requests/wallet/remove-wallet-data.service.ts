import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RemoveWalletDataService {

  constructor(private httpClient : HttpClient) {}

  removeWallet(idWallet : number) : Promise<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post(`${enviroment.baseUrl}/wallet/remove`, { idWallet }, { headers } ).subscribe(
        (apiResponse : any) => {
          const { result } = apiResponse;
          if (result.status === 200)
            resolve(true);
          resolve(false);
        }
      )
    })
  }
}
