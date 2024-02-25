import { TestBed } from '@angular/core/testing';

import { AddAlertPriceDataService } from './add-alert-price-data.service';

describe('AddAlertPriceDataService', () => {
  let service: AddAlertPriceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAlertPriceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
