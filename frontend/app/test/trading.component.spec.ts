import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingComponent } from '../src/app/shared/components/trading/trading.component';

describe('TradingComponent', () => {
  let component: TradingComponent;
  let fixture: ComponentFixture<TradingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TradingComponent]
    });
    fixture = TestBed.createComponent(TradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
