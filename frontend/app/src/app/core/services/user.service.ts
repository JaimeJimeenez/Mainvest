import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LocalStorage } from 'src/app/core/libs/local.storage';

import { PasswordDTO, UsernameDTO } from 'src/app/infraestructure/dto/user.dto';
import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';

import { UpdateMoney, Username } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _url = `${environment.dataUrl}/user`;
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
      `${this._url}/username/${id}`,
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
      `${this._url}/username`,
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
      `${this._url}/password`,
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
      `${this._url}/erase/${id}`,
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

  public getUser$(username: string): Observable<any> {
    return this.http.get<ApiResponse<any>>(
      `${this._url}/${username}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<any>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public getMoney$(id: number): Observable<number> {
    return this.http.get<ApiResponse<any[]>>(
      `${this._url}/money/${id}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<any[]>) => response.data[0].money),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public updateMoney$(updateMoney: UpdateMoney): Observable<boolean> {
    return this.http.put<ApiResponse<boolean>>(
      `${this._url}/money`,
      { updateMoney },
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
