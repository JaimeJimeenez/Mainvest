import { TestBed } from '@angular/core/testing';

import { AlertsPriceUpdateDataService } from './alerts-price-update-data.service';

describe('AlertsPriceUpdateDataService', () => {
  let service: AlertsPriceUpdateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsPriceUpdateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
