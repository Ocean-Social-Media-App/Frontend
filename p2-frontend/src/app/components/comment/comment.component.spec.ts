import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentComponent],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userService = new UserService(httpClientSpy as any);
   
    fixture.detectChanges();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    userService = TestBed.inject(UserService)
    httpMock = TestBed.inject(HttpTestingController)
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */

  /* it('should get user info for comments', () => {
    const userObj = component.userObj = {
      userId: 1,
      username: "name",
      password: "pass",
      email: "email",
      firstName: "first",
      lastName: "last",
      aboutMe: "all about me",
      bday: "bdayyyy",
      proPicUrl: "a url"
    }
    expect(component.userId).toEqual(1)

    userService.getUserById(1).subscribe((result: any) => {
      expect(result).toBe(userObj)
    })
  }) */
});
