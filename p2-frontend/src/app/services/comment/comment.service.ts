import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpCli: HttpClient) { }

  createComment(comment: any) {
    return this.httpCli.post(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/comment`, comment, {withCredentials: true});
  }

  getCommentsByPostId(postId:number): Observable<any>{
    return this.httpCli.get(`http://ec2-54-167-107-251.compute-1.amazonaws.com/api/comment/post/${postId}`, {withCredentials: true})
  }
}
