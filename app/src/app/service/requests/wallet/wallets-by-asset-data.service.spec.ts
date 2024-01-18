import { TestBed } from '@angular/core/testing';

import { WalletsByAssetDataService } from './wallets-by-asset-data.service';

describe('WalletsByAssetDataService', () => {
  let service: WalletsByAssetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletsByAssetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
