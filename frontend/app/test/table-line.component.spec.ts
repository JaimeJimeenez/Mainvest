import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLineComponent } from '../src/app/modules/market/market-home/table/table-line/table-line.component';

describe('TableLineComponent', () => {
  let component: TableLineComponent;
  let fixture: ComponentFixture<TableLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableLineComponent]
    });
    fixture = TestBed.createComponent(TableLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
