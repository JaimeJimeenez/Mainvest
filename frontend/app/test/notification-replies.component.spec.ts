import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRepliesComponent } from '../src/app/modules/notification/notification-replies/notification-replies.component';

describe('NotificationRepliesComponent', () => {
  let component: NotificationRepliesComponent;
  let fixture: ComponentFixture<NotificationRepliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationRepliesComponent]
    });
    fixture = TestBed.createComponent(NotificationRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
