import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, catchError, map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';
import { LogIn, SignUp } from '../interfaces/auth';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = environment.dataUrl;
  private _headers = environment.headers;

  constructor(private http: HttpClient) { }

  public signUp$(user: SignUp): Observable<User> {
    return this.http.post<ApiResponse<User>>(
      `${this._url}/auth/signup`,
      { user },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<User>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public logIn$(user: LogIn): Observable<User> {
    return this.http.get<ApiResponse<User>>(
      `${this._url}/auth/login/${ JSON.stringify(user) }`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<User>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    )
  }
}
