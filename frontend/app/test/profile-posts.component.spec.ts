import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostsComponent } from '../src/app/modules/profile/profile-posts/profile-posts.component';

describe('ProfilePostsComponent', () => {
  let component: ProfilePostsComponent;
  let fixture: ComponentFixture<ProfilePostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfilePostsComponent]
    });
    fixture = TestBed.createComponent(ProfilePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
