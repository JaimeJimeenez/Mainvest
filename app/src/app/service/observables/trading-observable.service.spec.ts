import { TestBed } from '@angular/core/testing';

import { TradingObservableService } from './trading-observable.service';

describe('TradingObservableService', () => {
  let service: TradingObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
