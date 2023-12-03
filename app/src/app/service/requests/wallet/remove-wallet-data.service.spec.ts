import { TestBed } from '@angular/core/testing';

import { RemoveWalletDataService } from './remove-wallet-data.service';

describe('RemoveWalletDataService', () => {
  let service: RemoveWalletDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveWalletDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
