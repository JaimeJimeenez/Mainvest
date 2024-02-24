import { TestBed } from '@angular/core/testing';

import { AlertsEraseDataService } from './alerts-erase-data.service';

describe('AlertsEraseDataService', () => {
  let service: AlertsEraseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsEraseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
