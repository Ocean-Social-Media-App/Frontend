import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerInfoComponent } from './follower-info.component';

describe('FollowerInfoComponent', () => {
  let component: FollowerInfoComponent;
  let fixture: ComponentFixture<FollowerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
