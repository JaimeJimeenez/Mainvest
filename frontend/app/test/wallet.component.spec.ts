import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletComponent } from '../src/app/shared/components/wallet/wallet.component';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WalletComponent]
    });
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
