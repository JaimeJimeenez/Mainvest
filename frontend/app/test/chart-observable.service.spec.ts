import { TestBed } from '@angular/core/testing';

import { ChartObservableService } from '../src/app/core/services/observables/chart-observable.service';

describe('ChartObservableService', () => {
  let service: ChartObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
