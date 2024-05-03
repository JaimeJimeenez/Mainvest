import { TestBed } from '@angular/core/testing';

import { FinancialService } from '../src/app/core/services/market.service';

describe('FinancialService', () => {
  let service: FinancialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
