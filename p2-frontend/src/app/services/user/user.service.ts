import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  searchOption=[]
  public userData: User[] | undefined
  constructor(private httpCli: HttpClient, private utilityService: UtilityService) { }

  getAllUsers():Observable<any> {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain}/api/user`, {withCredentials: true})
  }

  getUserById(id: number): Observable<any> {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain}/api/user/${id}`, {withCredentials: true})
  }

  register(user: User): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain}/api/user`, user, {withCredentials: true});
  }

  createProfile(user: User): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain}/api/createProfile`, user, {withCredentials: true});
  }

  updateProfile(user: User): Observable<any> {
    return this.httpCli.put(`${this.utilityService.getServerDomain}/api/updateUser`, user);
  }

  login(user: User): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain}/api/login`, user, {withCredentials: true});
  }

  logout() {
    return this.httpCli.get(`${this.utilityService.getServerDomain}/api/logout`, {withCredentials: true});
  }

  addProfileImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain}/api/profile`, formData, {withCredentials: true});
  }

  addPostImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain}/api/image`, formData, {withCredentials: true});
  }

  forgotPassword(username: string): Observable<any> {
    return this.httpCli.get(`http://localhost:9000/api/forgot/${username}`, {withCredentials: true});
  }
}
