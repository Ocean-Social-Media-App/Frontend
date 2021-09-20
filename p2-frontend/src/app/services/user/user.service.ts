import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  searchOption=[]
  public userData: User[] | undefined
  constructor(private httpCli: HttpClient) { }

  getAllUsers():Observable<any> {
    return this.httpCli.get<any>(`http://54.167.107.251:9000/api/user`, {withCredentials: true})
  }

  getUserById(id: number): Observable<any> {
    return this.httpCli.get<any>(`http://54.167.107.251:9000/api/user/${id}`, {withCredentials: true})
  }

  register(user: User): Observable<any> {
    return this.httpCli.post(`http://54.167.107.251:9000/api/user`, user, {withCredentials: true});
  }

  createProfile(user: User): Observable<any> {
    return this.httpCli.post(`http://54.167.107.251:9000/api/createProfile`, user, {withCredentials: true});
  }

  updateProfile(user: User): Observable<any> {
    return this.httpCli.put(`http://54.167.107.251:9000/api/updateUser`, user);
  }

  login(user: User): Observable<any> {
    return this.httpCli.post(`http://54.167.107.251:9000/api/login`, user, {withCredentials: true});
  }

  logout() {
    return this.httpCli.get(`http://54.167.107.251:9000/api/logout`, {withCredentials: true});
  }

  addProfileImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`http://54.167.107.251:9000/api/profile`, formData, {withCredentials: true});
  }

  addPostImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`http://54.167.107.251:9000/api/image`, formData, {withCredentials: true});
  }

  forgotPassword(username: string) {
    return this.httpCli.get(`http://54.167.107.251:9000/api/forgot/${username}`, {withCredentials: true});
  }
}
