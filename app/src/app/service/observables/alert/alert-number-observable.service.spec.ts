import { TestBed } from '@angular/core/testing';

import { AlertNumberObservableService } from './alert-number-observable.service';

describe('AlertNumberObservableService', () => {
  let service: AlertNumberObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertNumberObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
