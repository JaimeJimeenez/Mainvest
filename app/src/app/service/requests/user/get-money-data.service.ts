import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GetMoneyDataService {

  constructor(private httpClient : HttpClient) { }

  getMoney(idUser : number) : Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.get(`${enviroment.baseUrl}/user/get_money/${idUser}`, { headers })
      .pipe(
        map((response : any ) => response.data[0].money)
      );
  }
}
