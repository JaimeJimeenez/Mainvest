import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWalletsMainComponent } from '../src/app/modules/profile/profile-wallets/profile-wallets-main/profile-wallets-main.component';

describe('ProfileWalletsMainComponent', () => {
  let component: ProfileWalletsMainComponent;
  let fixture: ComponentFixture<ProfileWalletsMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileWalletsMainComponent]
    });
    fixture = TestBed.createComponent(ProfileWalletsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
