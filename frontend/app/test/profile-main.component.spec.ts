import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainComponent } from '../src/app/modules/dashboard/profile/profile-main/profile-main.component';

describe('ProfileMainComponent', () => {
  let component: ProfileMainComponent;
  let fixture: ComponentFixture<ProfileMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileMainComponent]
    });
    fixture = TestBed.createComponent(ProfileMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
