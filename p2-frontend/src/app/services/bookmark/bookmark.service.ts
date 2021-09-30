import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  jwtToken = sessionStorage.getItem('JWT');

  headers = new HttpHeaders().set('content-type', 'application/json')
                             .set('Access-Control-Allow-Origin', '*')
                             .set('authorization', this.jwtToken);

  constructor(private httpCli: HttpClient, private utilityService: UtilityService) { }

  bookmarkPost(postId : number, userId : number){
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/user/bookmark/${userId}`, postId, {'headers': this.headers})
  }

  unBookmarkPost(postId : number, userId : number){
    return this.httpCli.delete(`${this.utilityService.getServerDomain()}/api/user/bookmark/${userId}/${postId}`, {'headers': this.headers})
  }
     
  getBookmarks(userId : number){
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/user/bookmark/${userId}/1`, {'headers': this.headers})
  }


}
