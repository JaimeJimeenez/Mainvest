import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLikesComponent } from '../src/app/modules/profile/profile-likes/profile-likes.component';

describe('ProfileLikesComponent', () => {
  let component: ProfileLikesComponent;
  let fixture: ComponentFixture<ProfileLikesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileLikesComponent]
    });
    fixture = TestBed.createComponent(ProfileLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
