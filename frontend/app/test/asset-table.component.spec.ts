import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTableComponent } from './asset-table.component';

describe('AssetTableComponent', () => {
  let component: AssetTableComponent;
  let fixture: ComponentFixture<AssetTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AssetTableComponent]
    });
    fixture = TestBed.createComponent(AssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
