import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationNavComponent } from '../src/app/modules/notification/notification-nav/notification-nav.component';

describe('NotificationNavComponent', () => {
  let component: NotificationNavComponent;
  let fixture: ComponentFixture<NotificationNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationNavComponent]
    });
    fixture = TestBed.createComponent(NotificationNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
