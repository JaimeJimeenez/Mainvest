import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWalletComponent } from '../src/app/shared/components/trading/new-wallet/new-wallet.component';

describe('NewWalletComponent', () => {
  let component: NewWalletComponent;
  let fixture: ComponentFixture<NewWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewWalletComponent]
    });
    fixture = TestBed.createComponent(NewWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
