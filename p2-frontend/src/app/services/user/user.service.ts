import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpCli: HttpClient) { }


  getUserById(id: number): Observable<User> {
    return this.httpCli.get<User>(`http://localhost:9000/api/user/${id}`, {withCredentials: true})
  }
  
  register(user: User): Observable<any> {
    return this.httpCli.post(`http://localhost:9000/api/user`, user, {withCredentials: true});
  }

  createProfile(user: User): Observable<any> {
    return this.httpCli.post(`http://localhost:9000/api/createProfile`, user, {withCredentials: true});
  }

  login(user: User): Observable<any> {
    return this.httpCli.post(`http://localhost:9000/api/login`, user, {withCredentials: true});
  }

  addProfileImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`http://localhost:9000/api/profile`, formData);
  }

  addPostImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`http://localhost:9000/api/image`, formData);
  }
}
