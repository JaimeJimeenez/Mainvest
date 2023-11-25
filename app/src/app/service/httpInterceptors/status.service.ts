import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private _subject = new Subject<number>();
  private _quantityTasks : number = 0;

  public openTasks$ = this._subject.asObservable();

  constructor() { }

  addTask() : void {
    this._quantityTasks++;
    this._subject.next(this._quantityTasks);
  }

  removeTask() : void {
    this._quantityTasks--;
    this._subject.next(this._quantityTasks);
  }
}
