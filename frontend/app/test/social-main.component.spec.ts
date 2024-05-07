import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMainComponent } from '../src/app/modules/social/social-main/social-main.component';

describe('SocialMainComponent', () => {
  let component: SocialMainComponent;
  let fixture: ComponentFixture<SocialMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocialMainComponent]
    });
    fixture = TestBed.createComponent(SocialMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
