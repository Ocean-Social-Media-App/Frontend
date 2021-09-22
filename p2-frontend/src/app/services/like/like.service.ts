import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from 'src/app/models/Like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private httpCli: HttpClient) { }

  likePost(like: Like){
    return this.httpCli.post(`http://localhost:9000/api/like`, like, {withCredentials: true});
  }

  unLikePost(likeId: number){
    return this.httpCli.delete(`http://localhost:9000/api/like/${likeId}`, {withCredentials: true})
  }

  checkLike(postId : number, userId : number){
    return this.httpCli.get<any>(`http://localhost:9000/api/like/${postId}/${userId}`, {withCredentials: true})
  }
}
