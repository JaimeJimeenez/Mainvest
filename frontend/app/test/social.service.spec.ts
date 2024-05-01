import { TestBed } from '@angular/core/testing';

import { SocialService } from '../src/app/core/services/social.service';

describe('SocialService', () => {
  let service: SocialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
