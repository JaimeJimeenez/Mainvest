import { TestBed } from '@angular/core/testing';

import { NewWalletDataService } from './new-wallet-data.service';

describe('NewWalletDataService', () => {
  let service: NewWalletDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewWalletDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
