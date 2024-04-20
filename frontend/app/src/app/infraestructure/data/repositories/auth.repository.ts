import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, lastValueFrom, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { SignUp } from '../../../core/interfaces/user/signup';
import { ApiResponse, User } from '../../../core/interfaces/client/client';
import { Login } from 'src/app/core/interfaces/user/login';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {

  private _url = environment.dataUrl;
  private _headers = environment.headers;

  constructor(private http: HttpClient) { }

  signUp$(newUser: SignUp): Observable<User> {
    return this.http.post<ApiResponse<User>>(
      `${this._url}/auth/signup`,
      { newUser },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<User>) => {
        return response.data;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  logIn$(user: Login): Observable<User> {
    return this.http.get<ApiResponse<User>>(
      `${this._url}/auth/login/${ JSON.stringify(user) }`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<User>) => {
        return response.data;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    )
  }
}
