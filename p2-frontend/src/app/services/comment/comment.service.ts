import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Comment';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpCli: HttpClient, private utilityService: UtilityService) { }

  createComment(comment: Comment) {
    return this.httpCli.post(`${this.utilityService.getServerDomain}/api/comment`, comment, {withCredentials: true});
  }

  getCommentsByPostId(postId:number): Observable<any>{
    return this.httpCli.get(`${this.utilityService.getServerDomain}/api/comment/post/${postId}`, {withCredentials: true})
  }
}

