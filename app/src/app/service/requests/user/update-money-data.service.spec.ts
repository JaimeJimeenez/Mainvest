import { TestBed } from '@angular/core/testing';

import { UpdateMoneyDataService } from './update-money-data.service';

describe('UpdateMoneyDataService', () => {
  let service: UpdateMoneyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMoneyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
