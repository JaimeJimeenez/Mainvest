import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';
import { environment } from 'src/environments/environment';
import { NewFollower, UserSocial } from '../interfaces/social';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private _url = `${environment.dataUrl}/social`;
  private _headers = environment.headers;

  constructor(private http: HttpClient) { }

  public getFollowings$(idUser: number): Observable<number[]> {
    return this.http.get<ApiResponse<any[]>>(
      `${this._url}/followings/${idUser}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<any[]>) => response.data.map((value: any) => value.id)
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public getUserFollowings$(idUser: number): Observable<UserSocial[]> {
    return this.http.get<ApiResponse<UserSocial[]>>(
      `${this._url}/followings_users/${idUser}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<UserSocial[]>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public getUserFollowers$(idUser: number): Observable<UserSocial[]> {
    return this.http.get<ApiResponse<UserSocial[]>>(
      `${this._url}/followers_users/${idUser}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<UserSocial[]>) =>
        response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public followUser$(newFollower: NewFollower): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(
      `${this._url}/follow`,
      { newFollower },
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

  public unfollowUser$(idFollowing: number, idFollower: number): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this._url}/unfollow/${idFollowing}/${idFollower}`,
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
