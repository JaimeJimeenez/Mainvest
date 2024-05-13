import { TestBed } from '@angular/core/testing';

import { ChartPredictedObservableService } from '../src/app/core/services/observables/chart-predicted-observable.service';

describe('ChartPredictedObservableService', () => {
  let service: ChartPredictedObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartPredictedObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
