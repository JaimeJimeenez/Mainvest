import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewPostComponent } from '../src/app/shared/components/modals/modal-new-post/modal-new-post.component';

describe('ModalNewPostComponent', () => {
  let component: ModalNewPostComponent;
  let fixture: ComponentFixture<ModalNewPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalNewPostComponent]
    });
    fixture = TestBed.createComponent(ModalNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
