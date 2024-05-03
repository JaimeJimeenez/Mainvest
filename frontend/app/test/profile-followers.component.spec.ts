import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFollowersComponent } from '../src/app/modules/social/social-followers/social-followers.component';

describe('ProfileFollowersComponent', () => {
  let component: ProfileFollowersComponent;
  let fixture: ComponentFixture<ProfileFollowersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileFollowersComponent]
    });
    fixture = TestBed.createComponent(ProfileFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
