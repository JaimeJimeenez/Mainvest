import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Login } from 'src/app/interface/auth/login.interface';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SignupDataService {

  constructor(private httpClient : HttpClient) { }

  signUp(username : string, password : string, email : string) : Promise<Login> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return new Promise((resolve, reject) => {
      this.httpClient.post(`${enviroment.baseUrl}/auth/signup`, { username, password, email }, { headers }).subscribe(
        (apiResponse : any = {}) => {
          const { result, token } = apiResponse;
          if (result.status === 200) {
            const login : Login = { user : result.data[0], token };
            resolve(login);
          }
          if (result.status === 409)
            resolve({ user : result.data[0], token : ''});
          reject(undefined);
        }
      )
    });
  }
}
