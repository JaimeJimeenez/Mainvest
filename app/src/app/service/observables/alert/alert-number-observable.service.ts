import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertNumberObservableService {
  private _subject = new Subject<number>();
  public numberAlertData$ = this._subject.asObservable();

  numberOfAlerts(numberOfAlerts : number) : void {
    this._subject.next(numberOfAlerts);
  }
}
