import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLikedComponent } from './alert-liked.component';

describe('AlertLikedComponent', () => {
  let component: AlertLikedComponent;
  let fixture: ComponentFixture<AlertLikedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlertLikedComponent]
    });
    fixture = TestBed.createComponent(AlertLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
