import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketMainComponent } from '../src/app/modules/market/market-main/market-main.component';

describe('MarketMainComponent', () => {
  let component: MarketMainComponent;
  let fixture: ComponentFixture<MarketMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MarketMainComponent]
    });
    fixture = TestBed.createComponent(MarketMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
