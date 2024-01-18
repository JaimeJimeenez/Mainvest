import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBuyNewComponent } from './asset-buy-new.component';

describe('AssetBuyNewComponent', () => {
  let component: AssetBuyNewComponent;
  let fixture: ComponentFixture<AssetBuyNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetBuyNewComponent]
    });
    fixture = TestBed.createComponent(AssetBuyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
