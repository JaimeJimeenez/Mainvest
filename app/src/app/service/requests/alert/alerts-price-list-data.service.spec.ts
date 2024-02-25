import { TestBed } from '@angular/core/testing';

import { AlertsPriceListDataService } from './alerts-price-list-data.service';

describe('AlertsPriceListDataService', () => {
  let service: AlertsPriceListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsPriceListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
