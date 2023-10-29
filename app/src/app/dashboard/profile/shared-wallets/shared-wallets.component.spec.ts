import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedWalletsComponent } from './shared-wallets.component';

describe('SharedWalletsComponent', () => {
  let component: SharedWalletsComponent;
  let fixture: ComponentFixture<SharedWalletsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedWalletsComponent]
    });
    fixture = TestBed.createComponent(SharedWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
