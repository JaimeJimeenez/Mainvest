import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { enviroment } from 'src/enviroments/enviroment';
import { Login } from 'src/app/interface/auth/login.interface';

@Injectable({
  providedIn: 'any'
})
export class LoginDataService {

  constructor(
    private httpClient : HttpClient,
  ) { }

  verifyUser(username : string) : Promise<Login> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return new Promise((resolve, reject) => {
      this.httpClient.post<Login>(`${enviroment.baseUrl}/auth/login`, { username }, { headers }).subscribe(
        (apiResponse : any = {}) => {
          const { result, token } = apiResponse;
          if (result.status === 200) {
            const login : Login = { user : result.data[0], token : token }
            resolve(login);
          }
          reject(result.message);
        }
      )
    })
  }
}
