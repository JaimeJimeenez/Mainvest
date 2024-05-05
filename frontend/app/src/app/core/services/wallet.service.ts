import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { NewWallet, Wallet, Asset, UpdateWallet } from '../interfaces/wallet';

import { WalletMapper } from '../mappers/wallet.mapper';

import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';
import { WalletDTO } from 'src/app/infraestructure/dto/wallet.dto';

@Injectable({
  providedIn: 'root'
})
export class WalletService {


  private _url = `${environment.dataUrl}/wallet`;
  private _headers = environment.headers;

  constructor(private http: HttpClient) {}

  public createWallet$(newWallet: NewWallet): Observable<number> {
    return this.http.post<ApiResponse<any[]>>(
      `${this._url}/new`,
      { newWallet },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<any[]>) => response.data[0].id),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public addAssets$(assets: Asset[]): Observable<number[]> {
    return this.http.post<ApiResponse<any[]>>(
      `${this._url}/add_assets`,
      { assets },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<any[]>) => response.data),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  public getWallets$(idUser: number): Observable<Wallet[]> {
    return this.http.get<ApiResponse<WalletDTO[]>>(
      `${this._url}/user/${idUser}`,
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<WalletDTO[]>) =>
        WalletMapper.fromAPIToDomain(response.data)
      ),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  assignAssetsToWallet$(idsWalletAssets: number[]): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(
      `${this._url}/assign_ids`,
      { idsWalletAssets },
      { headers: this._headers }
    ).pipe(
      map((response: ApiResponse<boolean>) => response.data),
      catchError((errorResponse: HttpErrorResponse) => {
        throw errorResponse.error;
      })
    );
  }

  updateWalletAssets$(updateWallet: UpdateWallet): Observable<boolean> {
    return this.http.put<ApiResponse<boolean>>(
      `${this._url}/update`,
      { updateWallet },
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
