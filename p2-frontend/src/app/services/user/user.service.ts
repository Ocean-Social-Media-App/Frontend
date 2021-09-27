import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

  constructor(private httpCli: HttpClient, private utilityService: UtilityService) { }

  getAllUsers():Observable<any> {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/user/user`, {'headers': this.headers})
  }

  getUserById(id: number): Observable<any> {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/user/user/${id}`, {'headers': this.headers})
  }

  register(user: User): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/user/user`, user, {'headers': this.headers});
  }

  createProfile(user: User): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/user/createProfile`, user, {'headers': this.headers});
  }

  updateProfile(user: User): Observable<any> {
    return this.httpCli.put(`${this.utilityService.getServerDomain()}/api/user/updateUser`, user, {'headers': this.headers});
  }

  login(user: User): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/user/login`, user, {'headers': this.headers});
  }

  logout() {
    return this.httpCli.get(`${this.utilityService.getServerDomain()}/api/user/logout`, {'headers': this.headers});
  }

  addProfileImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/feed/profile`, formData, {'headers': this.headers});
  }

  addPostImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/feed/image`, formData, {'headers': this.headers});
  }

  forgotPassword(username: string): Observable<any> {
    return this.httpCli.get(`${this.utilityService.getServerDomain()}/api/forgot/${username}`, {'headers': this.headers});
  }

  getAllFollowing(loggedInUser: number): Observable<any>{
    return this.httpCli.get(`${this.utilityService.getServerDomain()}/api/user/follow/${loggedInUser}`, {'headers': this.headers});
  }

  getAllFollowers(loggedInUser:number): Observable<any>{
    return this.httpCli.get(`${this.utilityService.getServerDomain()}/api/user/followers/${loggedInUser}`, {'headers': this.headers}) //not real endpoint yet
  }

  followUser(userId: number, loggedInUser: number){
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/user/follow/${loggedInUser}`, {userId: `${userId}`}, {'headers': this.headers});
  }

   unfollowUser(userId: number, loggedInUser: number){
    return this.httpCli.delete(`${this.utilityService.getServerDomain()}/api/user/follow/${loggedInUser}`, {'headers': this.headers,'body': {userId: `${userId}`}});
  } 
}
