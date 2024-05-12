import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPostComponent } from '../src/app/modules/board/board-post/board-post.component';

describe('BoardPostComponent', () => {
  let component: BoardPostComponent;
  let fixture: ComponentFixture<BoardPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoardPostComponent]
    });
    fixture = TestBed.createComponent(BoardPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
