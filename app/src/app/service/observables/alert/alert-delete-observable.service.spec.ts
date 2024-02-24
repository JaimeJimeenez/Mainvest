import { TestBed } from '@angular/core/testing';

import { AlertDeleteObservableService } from './alert-delete-observable.service';

describe('AlertDeleteObservableService', () => {
  let service: AlertDeleteObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertDeleteObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
