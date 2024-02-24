import { TestBed } from '@angular/core/testing';

import { AlertsListDataService } from './alerts-list-data.service';

describe('AlertsListDataService', () => {
  let service: AlertsListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
