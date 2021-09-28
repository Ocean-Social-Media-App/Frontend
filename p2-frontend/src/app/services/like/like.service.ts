import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from 'src/app/models/Like';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  jwtToken = sessionStorage.getItem('JWT');

  headers = new HttpHeaders().set('content-type', 'application/json')
                             .set('Access-Control-Allow-Origin', '*')
                             .set('authorization', this.jwtToken);

  constructor(private httpCli: HttpClient, private utilityService: UtilityService) { }

  likePost(like: Like){
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/feed/like`, like, {'headers': this.headers})
  }

  unLikePost(likeId: number){
    return this.httpCli.delete(`${this.utilityService.getServerDomain()}/api/feed/like/${likeId}`, {'headers': this.headers})
  }

  checkLike(postId : number, userId : number){
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/like/${postId}/${userId}`, {'headers': this.headers})
  }

  getAllLikesByPost(postId: number){
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/like/${postId}`, {'headers': this.headers})
  }
}
