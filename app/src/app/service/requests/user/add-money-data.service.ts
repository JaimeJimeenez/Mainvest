import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AddMoneyDataService {

  constructor(private httpClient : HttpClient) { }

  addMoney(money : number, idUser : number) : Promise<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post(`${enviroment.baseUrl}/user/add_money`, { money, idUser }, { headers }).subscribe(
        (apiResponse : any) => {
          const { result } = apiResponse;
          if (result.status === 200)
            resolve(true);
          resolve(false);
        }
      )
    });
  }
}
