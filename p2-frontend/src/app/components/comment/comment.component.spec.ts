import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/services/user/user.service';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById']);
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CommentComponent ],
      providers: [ {provide: UserService, useValue: userServiceSpy} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
    userService.getUserById.and.returnValue({
      userId: 1,
      firstName: 'Trevor',
      lastName: 'Drury',
      username: 'trevdrury',
      password: null,
      email: 'trev@example.com',
      bday: '01-02-1986',
      aboutMe: 'testing'
    });
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
