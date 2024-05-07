import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReplyComponent } from '../src/app/shared/components/modals/modal-reply/modal-reply.component';

describe('ModalReplyComponent', () => {
  let component: ModalReplyComponent;
  let fixture: ComponentFixture<ModalReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalReplyComponent]
    });
    fixture = TestBed.createComponent(ModalReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
