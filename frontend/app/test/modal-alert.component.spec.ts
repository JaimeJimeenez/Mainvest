import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlertComponent } from '../src/app/shared/components/modals/modal-alert/modal-alert.component';

describe('ModalAlertComponent', () => {
  let component: ModalAlertComponent;
  let fixture: ComponentFixture<ModalAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalAlertComponent]
    });
    fixture = TestBed.createComponent(ModalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
