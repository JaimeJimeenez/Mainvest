import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Wallet } from '../interfaces/wallet';
import { ApiResponse } from 'src/app/infraestructure/dto/client.dto';
import { WalletDTO } from 'src/app/infraestructure/dto/wallet.dto';
import { WalletMapper } from '../mappers/wallet.mapper';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private _url = `${environment.dataUrl}/wallet`;
  private _headers = environment.headers;

  constructor(private http: HttpClient) {}

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
}
