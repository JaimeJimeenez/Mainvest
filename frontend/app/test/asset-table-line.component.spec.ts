import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTableLineComponent } from '../src/app/modules/market/market-asset/asset-table/asset-table-line/asset-table-line.component';

describe('AssetTableLineComponent', () => {
  let component: AssetTableLineComponent;
  let fixture: ComponentFixture<AssetTableLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AssetTableLineComponent]
    });
    fixture = TestBed.createComponent(AssetTableLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
