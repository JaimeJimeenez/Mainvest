import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAssetComponent } from '../src/app/modules/market/market-asset/market-asset.component';

describe('MarketAssetComponent', () => {
  let component: MarketAssetComponent;
  let fixture: ComponentFixture<MarketAssetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MarketAssetComponent]
    });
    fixture = TestBed.createComponent(MarketAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
