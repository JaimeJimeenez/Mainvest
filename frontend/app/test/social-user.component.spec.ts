import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialUserComponent } from '../src/app/shared/components/social-user/social-user.component';

describe('SocialUserComponent', () => {
  let component: SocialUserComponent;
  let fixture: ComponentFixture<SocialUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocialUserComponent]
    });
    fixture = TestBed.createComponent(SocialUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
