import { TestBed } from '@angular/core/testing';

import { SellAllAssetDataService } from './sell-all-asset-data.service';

describe('SellAllAssetDataService', () => {
  let service: SellAllAssetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellAllAssetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
