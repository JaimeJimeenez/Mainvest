import { TestBed } from '@angular/core/testing';

import { PostIdObservableService } from '../src/app/core/services/observables/post-id-observable.service';

describe('PostIdObservableService', () => {
  let service: PostIdObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostIdObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
