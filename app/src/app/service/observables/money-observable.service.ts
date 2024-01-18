import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyObservableService {
  private _subject = new Subject<any>();
  public moneyData$ = this._subject.asObservable();

  constructor() { }

  updateMoney(money : any) : void {
    this._subject.next(money);
  }
}
