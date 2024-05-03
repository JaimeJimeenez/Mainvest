import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWalletsListComponent } from '../src/app/modules/profile/profile-wallets/profile-wallets-list/profile-wallets-list.component';

describe('ProfileWalletsListComponent', () => {
  let component: ProfileWalletsListComponent;
  let fixture: ComponentFixture<ProfileWalletsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileWalletsListComponent]
    });
    fixture = TestBed.createComponent(ProfileWalletsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
