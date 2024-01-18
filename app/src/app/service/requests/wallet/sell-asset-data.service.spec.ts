import { TestBed } from '@angular/core/testing';

import { SellAssetDataService } from './sell-asset-data.service';

describe('SellAssetDataService', () => {
  let service: SellAssetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellAssetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
