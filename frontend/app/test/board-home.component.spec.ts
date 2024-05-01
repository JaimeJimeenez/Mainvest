import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHomeComponent } from '../src/app/modules/board/board-home/board-home.component';

describe('BoardHomeComponent', () => {
  let component: BoardHomeComponent;
  let fixture: ComponentFixture<BoardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoardHomeComponent]
    });
    fixture = TestBed.createComponent(BoardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
