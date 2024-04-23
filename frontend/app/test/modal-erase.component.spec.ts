import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEraseComponent } from '../src/app/modules/dashboard/profile/profile-settings/modal-erase/modal-erase.component';

describe('ModalEraseComponent', () => {
  let component: ModalEraseComponent;
  let fixture: ComponentFixture<ModalEraseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEraseComponent]
    });
    fixture = TestBed.createComponent(ModalEraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
