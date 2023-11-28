import { TestBed } from '@angular/core/testing';

import { GetWalletsDataService } from './get-wallets-data.service';

describe('GetWalletsDataService', () => {
  let service: GetWalletsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWalletsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
