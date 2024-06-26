import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHomeComponent } from '../src/app/modules/social/social-home/social-home.component';

describe('ProfileHomeComponent', () => {
  let component: ProfileHomeComponent;
  let fixture: ComponentFixture<ProfileHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileHomeComponent]
    });
    fixture = TestBed.createComponent(ProfileHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
