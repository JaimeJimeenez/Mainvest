import { TestBed } from '@angular/core/testing';

import { MenuObservableService } from './menu-observable.service';

describe('MenuObservableService', () => {
  let service: MenuObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
