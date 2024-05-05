import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistedWalletComponent } from '../src/app/shared/components/trading/existed-wallet/existed-wallet.component';

describe('ExistedWalletComponent', () => {
  let component: ExistedWalletComponent;
  let fixture: ComponentFixture<ExistedWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExistedWalletComponent]
    });
    fixture = TestBed.createComponent(ExistedWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
