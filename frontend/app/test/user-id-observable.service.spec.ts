import { TestBed } from '@angular/core/testing';

import { UserIdObservableService } from '../src/app/core/services/observables/user-id-observable.service';

describe('UserIdObservableService', () => {
  let service: UserIdObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
