import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostIdObservableService {

  private _subject = new Subject<number>();
  postId$ = this._subject.asObservable();

  sendPostId(postId: number): void {
    this._subject.next(postId);
  }
}
