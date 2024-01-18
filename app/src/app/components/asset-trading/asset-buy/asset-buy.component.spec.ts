import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBuyComponent } from './asset-buy.component';

describe('AssetBuyComponent', () => {
  let component: AssetBuyComponent;
  let fixture: ComponentFixture<AssetBuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetBuyComponent]
    });
    fixture = TestBed.createComponent(AssetBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
