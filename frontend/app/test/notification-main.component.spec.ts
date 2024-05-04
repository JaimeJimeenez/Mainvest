import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMainComponent } from '../src/app/modules/notification/notification-main/notification-main.component';

describe('NotificationMainComponent', () => {
  let component: NotificationMainComponent;
  let fixture: ComponentFixture<NotificationMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationMainComponent]
    });
    fixture = TestBed.createComponent(NotificationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
