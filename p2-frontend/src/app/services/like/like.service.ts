import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from 'src/app/models/Like';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private httpCli: HttpClient, private utilityService: UtilityService) { }

  likePost(like: Like){

    return this.httpCli.post(`${this.utilityService.getServerDomain}/api/like`, like, {withCredentials: true});
  }

  unLikePost(likeId: number){
    return this.httpCli.delete(`${this.utilityService.getServerDomain}/api/like/${likeId}`, {withCredentials: true})
  }

  checkLike(postId : number, userId : number){
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain}/api/like/${postId}/${userId}`, {withCredentials: true})
  }
}
