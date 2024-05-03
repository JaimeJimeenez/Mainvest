import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';

import { environment } from 'src/environments/environment';
import { Like, NewPost, Post, Reply } from '../interfaces/board';
import { PostDTO } from 'src/app/infraestructure/dto/board.dto';
import { PostMapper } from '../mappers/post.mapper';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private _url = `${environment.dataUrl}/board`;
  private _headers = environment.headers;

  constructor(private http: HttpClient) { }

  public getRandomPosts$(): Observable<Post[]> {
    return this.http.get<ApiResponse<PostDTO[]>> (
      `${this._url}/random_posts`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<PostDTO[]>) =>
          PostMapper.fromAPIToDomain(response.data)
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public newPost$(newPost: NewPost): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>> (
      `${this._url}/new_post`,
      { newPost },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) => response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public reply$(reply: Reply): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>> (
      `${this._url}/new_reply`,
      { reply },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) => response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public updateLike$(like: Like): Observable<boolean> {
    return this.http.put<ApiResponse<boolean>> (
      `${this._url}/update_like`,
      { like },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) => response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public addLike$(like: Like): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>> (
      `${this._url}/add_like`,
      { like },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) => response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public deleteLike$(like: Like): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>> (
      `${this._url}/delete_like/${like.idUser}/${like.idPost}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) => response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public getLikedPosts$(id: number): Observable<number[]> {
    return this.http.get<ApiResponse<any[]>>(
      `${this._url}/liked_posts/${id}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<any[]>) =>
        response.data.map((value: any) => value.id)
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    )
  }

  getFollowingPosts$(ids: number[]): Observable<Post[]> {
    return this.http.get<ApiResponse<Post[]>>(
      `${this._url}/following_posts/${ids}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<Post[]>) => response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    )
  }

  getUsersPosts$(idUser: number): Observable<Post[]> {
    return this.http.get<ApiResponse<Post[]>>(
      `${this._url}/get_users/${idUser}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<Post[]>) => response.data
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }
}
