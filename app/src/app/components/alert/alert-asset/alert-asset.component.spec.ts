import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAssetComponent } from './alert-asset.component';

describe('AlertAssetComponent', () => {
  let component: AlertAssetComponent;
  let fixture: ComponentFixture<AlertAssetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlertAssetComponent]
    });
    fixture = TestBed.createComponent(AlertAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
