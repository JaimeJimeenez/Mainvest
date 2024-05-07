import { TestBed } from '@angular/core/testing';

import { WalletObservableService } from '../src/app/core/services/observables/wallet-observable.service';

describe('WalletObservableService', () => {
  let service: WalletObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
