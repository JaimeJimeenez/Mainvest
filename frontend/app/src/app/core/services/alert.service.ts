import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Alert } from '../interfaces/alert';
import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';
import { AlertDTO } from 'src/app/infraestructure/dto/alert.dto';
import { AlertMapper } from '../mappers/alert.mapper';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _url = `${environment.dataUrl}/alert`;
  private _headers = environment.headers;

  constructor(private http: HttpClient) { }

  public addAlert$(alert: Alert): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(
      `${this._url}/add`,
      { alert },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) => response.success),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public getUserAlerts$(idUser: number): Observable<Alert[]> {
    return this.http.get<ApiResponse<AlertDTO[]>>(
      `${this._url}/user/${idUser}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<AlertDTO[]>) =>
        AlertMapper.fromAPIToDomain(response.data)
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public deleteAlert$(id: number): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this._url}/${id}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) => response.success),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }
}
