import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/User';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  /* it('should be created', () => {
    expect(service).toBeTruthy();
  }); */

  it('should return all users when getAllUsers called', () => {
    service.getAllUsers().subscribe((result:any) => {
      expect(result).toEqual(new User);
    })

    const req = httpMock.expectOne('http://54.167.107.251:9000/api/user', 'get all users');
    expect(req.request.method).toBe('GET');

    req.flush(new User);

    httpMock.verify();

  })

  it('should return user when getUserById is called', () => {
    service.getUserById(1).subscribe((result: User) => {
      expect(result).toEqual(new User);
    })

    const req = httpMock.expectOne('http://54.167.107.251:9000/api/user/1', 'get user by id 1');
    expect(req.request.method).toBe('GET');

    req.flush(new User);

    httpMock.verify();
  })

  it('should return user when account created', (() => {
    service.register(new User()).subscribe((result: User) => {
      expect(result).toEqual(new User());
    })

    const req = httpMock.expectOne('http://54.167.107.251:9000/api/user', 'regiter new user');
    expect(req.request.method).toBe('POST');

    req.flush(new User());

    httpMock.verify();

  }))

  it('should return user when user updated', () => {
    service.updateProfile(new User).subscribe((result: User) => {
      expect(result).toEqual(new User);

      const req = httpMock.expectOne('http://54.167.107.251:9000/api/updateUser', 'update user profile');
      expect(req.request.method).toBe('PUT');

      req.flush(new User);

      httpMock.verify();
    })
  })

  it('should return user when login called', () => {
    service.login(new User()).subscribe((result: User) => {
      expect(result).toEqual(new User());

      const req = httpMock.expectOne('http://54.167.107.251:9000/api/login', 'user login');
      expect(req.request.method).toBe('POST');

      req.flush(new User());

      httpMock.verify();
    })
  })

  it('should return user when logout called', () => {
    service.logout().subscribe((result: any) => {
      expect(result).toEqual(null);

      const req = httpMock.expectOne('http://54.167.107.251:9000/api/logout', 'user logout');
      expect(req.request.method).toBe('GET');

      req.flush(null);

      httpMock.verify();
    })
  })

});
