import { TestBed } from '@angular/core/testing';

import { EraseAssetDataService } from './erase-asset-data.service';

describe('EraseAssetDataService', () => {
  let service: EraseAssetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EraseAssetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
