import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from 'src/app/models/Like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private httpCli: HttpClient) { }

  likePost(like: Like){
    return this.httpCli.post(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/like`, like, {withCredentials: true});
  }

  unLikePost(likeId: number){
    return this.httpCli.delete(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/like/${likeId}`, {withCredentials: true})
  }

  checkLike(postId : number, userId : number){
    return this.httpCli.get<any>(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/like/${postId}/${userId}`, {withCredentials: true})
  }
}
