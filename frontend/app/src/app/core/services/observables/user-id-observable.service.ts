import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserIdObservableService {

  private _subject = new Subject<number>();
  userId$ = this._subject.asObservable();

  sendUserId(userId: number): void {
    this._subject.next(userId);
  }
}
