import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ModifyAssetDataService {

  constructor(private httpClient : HttpClient) { }

  modifyAsset(idWallet : number, name : string, amount : number) : Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.httpClient.post(`${enviroment.baseUrl}}/asset/modify`, {idWallet, name, amount}, { headers}).pipe(
      map((apiResponse : any = {}) => apiResponse.status === 200)
    );
  }

}
