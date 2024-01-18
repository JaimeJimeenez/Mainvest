import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewWalletDataService {

  constructor(private httpClient : HttpClient) { }

  createWallet(idUser : number, wallet : string) : Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.httpClient.post(`${enviroment.baseUrl}/wallet/new`, { idUser, wallet }, { headers }).pipe(
      map((apiResponse : any = {}) => {
        const { result } = apiResponse;
        return result.status === 200 ? result.data[0].id : -1;
      })
    );
  }
}
