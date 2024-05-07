import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchObservableService {

  private _subject = new Subject<string>();
  search$ = this._subject.asObservable();

  sendSearch(search: string): void {
    this._subject.next(search);
  }
}
