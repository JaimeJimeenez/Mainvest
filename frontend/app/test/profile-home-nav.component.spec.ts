import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHomeNavComponent } from '../src/app/modules/profile/profile-home-nav/profile-home-nav.component';

describe('ProfileHomeNavComponent', () => {
  let component: ProfileHomeNavComponent;
  let fixture: ComponentFixture<ProfileHomeNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileHomeNavComponent]
    });
    fixture = TestBed.createComponent(ProfileHomeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
