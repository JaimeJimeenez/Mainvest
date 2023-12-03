import { TestBed } from '@angular/core/testing';

import { AddMoneyDataService } from './add-money-data.service';

describe('AddMoneyDataService', () => {
  let service: AddMoneyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMoneyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
