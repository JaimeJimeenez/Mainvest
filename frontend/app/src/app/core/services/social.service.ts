import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';
import { environment } from 'src/environments/environment';

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
}
