import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBuyExistComponent } from './asset-buy-exist.component';

describe('AssetBuyExistComponent', () => {
  let component: AssetBuyExistComponent;
  let fixture: ComponentFixture<AssetBuyExistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetBuyExistComponent]
    });
    fixture = TestBed.createComponent(AssetBuyExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
