import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketHomeComponent } from '../src/app/modules/market/market-home/market-home.component';

describe('MarketHomeComponent', () => {
  let component: MarketHomeComponent;
  let fixture: ComponentFixture<MarketHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MarketHomeComponent]
    });
    fixture = TestBed.createComponent(MarketHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
