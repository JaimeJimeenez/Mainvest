import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoComponent } from './info.component';

describe('UserInfoComponent', () => {
  let component: ProfileInfoComponent;
  let fixture: ComponentFixture<ProfileInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileInfoComponent]
    });
    fixture = TestBed.createComponent(ProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
