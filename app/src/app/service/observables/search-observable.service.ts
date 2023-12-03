import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchObservableService {
  private _subject = new Subject<string>();
  public searchData$ = this._subject.asObservable();

  public searchItem(item : string) {
    this._subject.next(item);
  }
}
