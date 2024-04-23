import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNavComponent } from '../src/app/modules/dashboard/profile/profile-nav/profile-nav.component';

describe('ProfileNavComponent', () => {
  let component: ProfileNavComponent;
  let fixture: ComponentFixture<ProfileNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileNavComponent]
    });
    fixture = TestBed.createComponent(ProfileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
