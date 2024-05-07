import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSignOutComponent } from '../src/app/shared/components/modals/modal-sign-out/modal-sign-out.component';

describe('ModalSignOutComponent', () => {
  let component: ModalSignOutComponent;
  let fixture: ComponentFixture<ModalSignOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalSignOutComponent]
    });
    fixture = TestBed.createComponent(ModalSignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
