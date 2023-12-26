import { TestBed } from '@angular/core/testing';

import { ModifyAssetDataService } from './modify-asset-data.service';

describe('ModifyAssetDataService', () => {
  let service: ModifyAssetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifyAssetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
