import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMoneyComponent } from './card-money.component';

describe('CardMoneyComponent', () => {
  let component: CardMoneyComponent;
  let fixture: ComponentFixture<CardMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardMoneyComponent]
    });
    fixture = TestBed.createComponent(CardMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
