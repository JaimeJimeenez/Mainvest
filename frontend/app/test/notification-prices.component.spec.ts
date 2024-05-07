import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPricesComponent } from '../src/app/modules/notification/notification-prices/notification-prices.component';

describe('NotificationPricesComponent', () => {
  let component: NotificationPricesComponent;
  let fixture: ComponentFixture<NotificationPricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationPricesComponent]
    });
    fixture = TestBed.createComponent(NotificationPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
