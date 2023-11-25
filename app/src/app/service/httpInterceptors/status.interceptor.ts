import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { StatusService } from './status.service';

@Injectable()
export class StatusInterceptor implements HttpInterceptor {

  constructor(private status : StatusService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.status.addTask();
    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse)
          this.status.removeTask();
        return event;
      })
    );
  }
}
