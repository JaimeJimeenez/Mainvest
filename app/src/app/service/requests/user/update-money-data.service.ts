import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UpdateMoneyDataService {

  constructor(private httpClient : HttpClient) { }

  updateMoney(idUser : number, money : number) : Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(`${enviroment.baseUrl}/user/update_money`, { money, idUser }, { headers }).pipe(
      map((apiResponse : any) => {
        const { result } = apiResponse;
        return result.status === 200;
      })
    )
  }
}
