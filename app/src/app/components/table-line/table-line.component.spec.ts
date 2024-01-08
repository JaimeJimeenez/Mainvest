import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLineComponent } from './table-line.component';

describe('TableLineComponent', () => {
  let component: TableLineComponent;
  let fixture: ComponentFixture<TableLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableLineComponent]
    });
    fixture = TestBed.createComponent(TableLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
