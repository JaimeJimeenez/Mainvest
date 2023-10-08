import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuObservableService {

  private _subject = new Subject<boolean>();
  private userAutheticated = this._subject.asObservable();

  constructor() { }

  
}
