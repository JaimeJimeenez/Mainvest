import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Post } from '../interfaces/board';
import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';
import { Notification } from '../interfaces/social';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _url = `${environment.dataUrl}/notification`;
  private _headers = environment.headers;

  constructor(private http: HttpClient) {}

  public getLikedPosts$(idUser: number): Observable<Post[]> {
    return this.http.get<ApiResponse<Post[]>>(
      `${this._url}/liked/${idUser}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<Post[]>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    )
  }

  public addNotification$(notification: Notification): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(
      `${this._url}/new`,
      { notification },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    )
  }

  public deleteNotification$(idUser: number, idPost: number, isLiked: boolean): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this._url}/${idUser}/${idPost}/${isLiked}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    )
  }

  public getRepliesPosts$(idUser: number): Observable<Post[]> {
    return this.http.get<ApiResponse<Post[]>>(
      `${this._url}/replies/${idUser}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<Post[]>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    )
  }
}
