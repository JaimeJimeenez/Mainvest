import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainvestComponent } from './mainvest.component';

describe('MainvestComponent', () => {
  let component: MainvestComponent;
  let fixture: ComponentFixture<MainvestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainvestComponent]
    });
    fixture = TestBed.createComponent(MainvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
