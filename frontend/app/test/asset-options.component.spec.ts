import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetOptionsComponent } from '../src/app/modules/market/market-asset/asset-options/asset-options.component';

describe('AssetOptionsComponent', () => {
  let component: AssetOptionsComponent;
  let fixture: ComponentFixture<AssetOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AssetOptionsComponent]
    });
    fixture = TestBed.createComponent(AssetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
