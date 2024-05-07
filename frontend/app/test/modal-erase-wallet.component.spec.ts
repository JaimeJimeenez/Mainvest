import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEraseWalletComponent } from '../src/app/shared/components/modals/modal-erase-wallet/modal-erase-wallet.component';

describe('ModalEraseWalletComponent', () => {
  let component: ModalEraseWalletComponent;
  let fixture: ComponentFixture<ModalEraseWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalEraseWalletComponent]
    });
    fixture = TestBed.createComponent(ModalEraseWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
