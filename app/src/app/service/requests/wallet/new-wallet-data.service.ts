import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NewWalletDataService {

  constructor(private httpClient : HttpClient) { }

  createWallet(idUser : number, wallet : string) : Promise<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return new Promise<number>((resolve, reject) => {
      this.httpClient.post(`${enviroment.baseUrl}/wallet/new`, { idUser, wallet }, { headers }).subscribe(
        (apiResponse : any) => {
          const { result } = apiResponse;
          if ( result.status === 200)
            resolve(result.data[0].id);
          else resolve(-1);
        }
      )
    });
  }
}
