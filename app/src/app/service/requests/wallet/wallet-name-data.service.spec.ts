import { TestBed } from '@angular/core/testing';

import { WalletNameDataService } from './wallet-name-data.service';

describe('WalletNameDataService', () => {
  let service: WalletNameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletNameDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
