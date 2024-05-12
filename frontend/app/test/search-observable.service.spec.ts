import { TestBed } from '@angular/core/testing';

import { SearchObservableService } from '../src/app/core/services/observables/search-observable.service';

describe('SearchObservableService', () => {
  let service: SearchObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
