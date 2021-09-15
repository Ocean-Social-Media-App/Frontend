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
}
