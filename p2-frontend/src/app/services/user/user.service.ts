import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpCli: HttpClient) { }

  register(user: User): Observable<any> {
    return this.httpCli.post(`http://localhost:9000/api/user`, user);
  }

  createProfile(user: User): Observable<any> {
    return this.httpCli.post(`http://localhost:9000/api/createProfile`, user);
  }

  login(user: User): Observable<any> {
    return this.httpCli.post(`http://localhost:9000/api/login`, user);
  }

  addProfileImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`http://localhost:9000/api/profile`, formData);
  }

  addPostImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`http://localhost:9000/api/image`, formData);
  }
}
