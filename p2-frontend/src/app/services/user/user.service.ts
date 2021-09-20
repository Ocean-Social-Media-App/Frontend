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
    return this.httpCli.get<any>(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/user`, {withCredentials: true})
  }

  getUserById(id: number): Observable<any> {
    return this.httpCli.get<any>(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/user/${id}`, {withCredentials: true})
  }

  register(user: User): Observable<any> {
    return this.httpCli.post(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/user`, user, {withCredentials: true});
  }

  createProfile(user: User): Observable<any> {
    return this.httpCli.post(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/createProfile`, user, {withCredentials: true});
  }

  updateProfile(user: User): Observable<any> {
    return this.httpCli.put(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/updateUser`, user);
  }

  login(user: User): Observable<any> {
    return this.httpCli.post(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/login`, user, {withCredentials: true});
  }

  logout() {
    return this.httpCli.get(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/logout`, {withCredentials: true});
  }

  addProfileImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/profile`, formData, {withCredentials: true});
  }

  addPostImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/image`, formData, {withCredentials: true});
  }
}
