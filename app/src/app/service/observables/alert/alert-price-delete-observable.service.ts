import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertPriceDeleteObservableService {

  private _subject = new Subject<number>();
  public alertPriceData$ = this._subject.asObservable();

  deleteAlert(id : number) : void {
    this._subject.next(id);
  }
}
