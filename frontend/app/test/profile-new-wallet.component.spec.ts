import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNewWalletComponent } from '../src/app/modules/wallet/profile-new-wallet/profile-new-wallet.component';

describe('ProfileNewWalletComponent', () => {
  let component: ProfileNewWalletComponent;
  let fixture: ComponentFixture<ProfileNewWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileNewWalletComponent]
    });
    fixture = TestBed.createComponent(ProfileNewWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
