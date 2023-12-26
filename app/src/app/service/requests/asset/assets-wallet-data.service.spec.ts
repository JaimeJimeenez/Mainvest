import { TestBed } from '@angular/core/testing';

import { AssetsWalletDataService } from './assets-wallet-data.service';

describe('AssetsWalletDataService', () => {
  let service: AssetsWalletDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsWalletDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
