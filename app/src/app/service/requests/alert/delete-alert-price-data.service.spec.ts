import { TestBed } from '@angular/core/testing';

import { DeleteAlertPriceDataService } from './delete-alert-price-data.service';

describe('DeleteAlertPriceService', () => {
  let service: DeleteAlertPriceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAlertPriceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
