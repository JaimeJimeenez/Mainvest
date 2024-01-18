import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTradingComponent } from './asset-trading.component';

describe('AssetTradingComponent', () => {
  let component: AssetTradingComponent;
  let fixture: ComponentFixture<AssetTradingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetTradingComponent]
    });
    fixture = TestBed.createComponent(AssetTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
