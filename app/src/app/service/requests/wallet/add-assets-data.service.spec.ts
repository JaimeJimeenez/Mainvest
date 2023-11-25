import { TestBed } from '@angular/core/testing';

import { AddAssetsDataService } from './add-assets-data.service';

describe('AddAssetsDataService', () => {
  let service: AddAssetsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAssetsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
