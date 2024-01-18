import { TestBed } from '@angular/core/testing';

import { UpdateAssetDataService } from './update-asset-data.service';

describe('UpdateAssetDataService', () => {
  let service: UpdateAssetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAssetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
