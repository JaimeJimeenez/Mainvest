import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCommentComponent } from './alert-comment.component';

describe('AlertCommentComponent', () => {
  let component: AlertCommentComponent;
  let fixture: ComponentFixture<AlertCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlertCommentComponent]
    });
    fixture = TestBed.createComponent(AlertCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
