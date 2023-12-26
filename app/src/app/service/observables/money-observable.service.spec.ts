import { TestBed } from '@angular/core/testing';

import { MoneyObservableService } from './money-observable.service';

describe('MoneyObservableService', () => {
  let service: MoneyObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
