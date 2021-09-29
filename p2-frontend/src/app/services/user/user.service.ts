import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  searchOption=[]
  public userData: User[] | undefined

  jwtToken = sessionStorage.getItem('JWT');

  headers = new HttpHeaders().set('content-type', 'application/json')
                             .set('Access-Control-Allow-Origin', '*')
                             .set('authorization', this.jwtToken);

  constructor(private httpCli: HttpClient, private utilityService: UtilityService, private router: Router) { }

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

  // we are now handling logout from the frontend, so no need to use httpClient
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

  addProfileImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/feed/profile`, formData, {'headers': this.headers});
  }

  addPostImage(formData: FormData): Observable<any> {
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/feed/image`, formData, {'headers': this.headers});
  }

  forgotPassword(username: string): Observable<any> {
    return this.httpCli.get(`${this.utilityService.getServerDomain()}/api/user/forgot/${username}`, {'headers': this.headers});
  }

  getUserNotifications(userId: number): Observable<any> {
    return this.httpCli.get(`${this.utilityService.getServerDomain()}/api/user/notification/${userId}`, { 'headers': this.headers });
  }
}
