import { TestBed } from '@angular/core/testing';

import { UserByAlertDataService } from './user-by-alert-data.service';

describe('UserByAlertDataService', () => {
  let service: UserByAlertDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserByAlertDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
