import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMainComponent } from '../src/app/modules/board/board-main/board-main.component';

describe('BoardMainComponent', () => {
  let component: BoardMainComponent;
  let fixture: ComponentFixture<BoardMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoardMainComponent]
    });
    fixture = TestBed.createComponent(BoardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
