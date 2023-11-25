import { TestBed } from '@angular/core/testing';

import { FinancialAssetsDataService } from './financial-assets-data.service';

describe('FinancialAssetsDataService', () => {
  let service: FinancialAssetsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialAssetsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
