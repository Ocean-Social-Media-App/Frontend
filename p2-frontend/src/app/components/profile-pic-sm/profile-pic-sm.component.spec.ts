import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicSmComponent } from './profile-pic-sm.component';

describe('ProfilePicSmComponent', () => {
  let component: ProfilePicSmComponent;
  let fixture: ComponentFixture<ProfilePicSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePicSmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePicSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
