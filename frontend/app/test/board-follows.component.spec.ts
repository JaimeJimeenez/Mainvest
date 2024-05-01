import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFollowsComponent } from '../src/app/modules/board/board-follows/board-follows.component';

describe('BoardFollowsComponent', () => {
  let component: BoardFollowsComponent;
  let fixture: ComponentFixture<BoardFollowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoardFollowsComponent]
    });
    fixture = TestBed.createComponent(BoardFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
