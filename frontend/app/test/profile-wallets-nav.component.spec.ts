import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWalletsNavComponent } from '../src/app/modules/wallet/wallets-nav/wallets-nav.component';

describe('ProfileWalletsNavComponent', () => {
  let component: ProfileWalletsNavComponent;
  let fixture: ComponentFixture<ProfileWalletsNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileWalletsNavComponent]
    });
    fixture = TestBed.createComponent(ProfileWalletsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
