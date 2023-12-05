import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WalletNameDataService {

  constructor(private httpClient : HttpClient) {}

  getWalletName(idWallet : number) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log(idWallet);


    return this.httpClient.get(`${enviroment.baseUrl}/wallet/name/${idWallet}`, { headers }).pipe(
      map((response : any = {}) => response.data[0])
    )
  }
}
