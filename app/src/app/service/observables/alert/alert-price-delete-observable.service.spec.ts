import { TestBed } from '@angular/core/testing';

import { AlertPriceDeleteObservableService } from './alert-price-delete-observable.service';

describe('AlertPriceDeleteObservableService', () => {
  let service: AlertPriceDeleteObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertPriceDeleteObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
