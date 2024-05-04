import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationLikesComponent } from '../src/app/modules/notification/notification-likes/notification-likes.component';

describe('NotificationLikesComponent', () => {
  let component: NotificationLikesComponent;
  let fixture: ComponentFixture<NotificationLikesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationLikesComponent]
    });
    fixture = TestBed.createComponent(NotificationLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
