import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradingObservableService {
  private _subject = new Subject<any>();
  public tradingData$ = this._subject.asObservable();

  constructor() { }

  tradingAsset(asset : any) : void {
    this._subject.next(asset);
  }
}
