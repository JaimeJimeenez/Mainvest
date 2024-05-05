import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionComponent } from '../src/app/shared/components/prediction/prediction.component';

describe('PredictionComponent', () => {
  let component: PredictionComponent;
  let fixture: ComponentFixture<PredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PredictionComponent]
    });
    fixture = TestBed.createComponent(PredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
