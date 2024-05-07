import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Wallet } from '../../interfaces/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletObservableService {

  private _subject = new Subject<Wallet>();
  wallet$ = this._subject.asObservable();

  sendWallet(wallet: Wallet): void {
    this._subject.next(wallet);
  }
}
