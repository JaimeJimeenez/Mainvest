import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownWalletComponent } from '../src/app/shared/components/dropdown-wallet/dropdown-wallet.component';

describe('DropdownWalletComponent', () => {
  let component: DropdownWalletComponent;
  let fixture: ComponentFixture<DropdownWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DropdownWalletComponent]
    });
    fixture = TestBed.createComponent(DropdownWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
