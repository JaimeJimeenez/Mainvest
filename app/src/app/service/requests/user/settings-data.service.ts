import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SettingsDataService {

  constructor(private httpClient : HttpClient) { }

  updateUsername(oldUsername : string, newUsername : string) : Promise<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return new Promise((resolve, reject) => {
      this.httpClient.post(`${enviroment.baseUrl}/user/updateUser`, { oldUsername, newUsername }, { headers }).subscribe(
        (apiResponse : any = {}) => {
          const { result } = apiResponse;
          if (result.status === 200)
            resolve(true);
          else if (result.status === 409)
            resolve(false);
          else reject(false);
        }
      )
    });
  }

  updatePassword(username : string, password : string) : Promise<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return new Promise((resolve, reject) => {
      this.httpClient.post(`${enviroment.baseUrl}/user/updatePassword`, { username, password }, { headers }).subscribe(
        (apiResponse : any = {}) => {
          const { result } = apiResponse;
          if (result.status === 200)
            resolve(true);
          else reject(false);
        }
      )
    });
  }

  eraseUser(username : string) : Promise<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return new Promise((resolve, reject) => {
      this.httpClient.post(`${enviroment.baseUrl}/user/erase`, { username }, { headers }).subscribe(
        (apiResponse : any = {}) => {
          const { result } = apiResponse;
          if (result.status === 200)
            resolve(true);
          else reject(false);
        }
      )
    });
  }
}
