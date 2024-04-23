import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LocalStorage } from 'src/app/core/libs/local.storage';

import { PasswordDTO, UsernameDTO } from 'src/app/infraestructure/dto/user.dto';
import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';

import { Username } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _url = environment.dataUrl;
  private _headers = environment.headers;

  constructor(private http: HttpClient) {}

  public isUserLoggedIn(): boolean {
    return LocalStorage.getToken() !== undefined;
  }

  public getUserId(): number {
    const user = LocalStorage.getUser();
    return user ? user.id : 0;
  }

  public getUsername$(id: number): Observable<Username> {
    return this.http.get<ApiResponse<Username>>(
      `${this._url}/user/username/${id}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<Username>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public changeUsername$(user: UsernameDTO): Observable<boolean> {
    return this.http.put<ApiResponse<boolean>>(
      `${this._url}/user/username`,
      { user },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public changePassword$(newPassword: PasswordDTO): Observable<boolean> {
    return this.http.put<ApiResponse<boolean>>(
      `${this._url}/user/password`,
      { newPassword },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public eraseUser$(id: number): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this._url}/user/erase/${id}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }
}
