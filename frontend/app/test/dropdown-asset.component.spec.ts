import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAssetComponent } from '../src/app/shared/components/dropdown/dropdown-asset/dropdown-asset.component';

describe('DropdownAssetComponent', () => {
  let component: DropdownAssetComponent;
  let fixture: ComponentFixture<DropdownAssetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DropdownAssetComponent]
    });
    fixture = TestBed.createComponent(DropdownAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
