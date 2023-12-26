import { TestBed } from '@angular/core/testing';

import { GetMoneyDataService } from './get-money-data.service';

describe('GetMoneyDataService', () => {
  let service: GetMoneyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMoneyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
