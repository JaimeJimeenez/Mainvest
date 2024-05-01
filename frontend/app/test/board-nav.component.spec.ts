import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardNavComponent } from '../src/app/modules/board/board-nav/board-nav.component';

describe('BoardNavComponent', () => {
  let component: BoardNavComponent;
  let fixture: ComponentFixture<BoardNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoardNavComponent]
    });
    fixture = TestBed.createComponent(BoardNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
