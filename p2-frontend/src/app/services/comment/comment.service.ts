import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Comment';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  jwtToken = sessionStorage.getItem('JWT');

  headers = new HttpHeaders().set('content-type', 'application/json')
                             .set('Access-Control-Allow-Origin', '*')
                             .set('authorization', this.jwtToken);

  constructor(private httpCli: HttpClient, private utilityService: UtilityService) { }

  createComment(comment: Comment) {
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/feed/comment`, comment, {'headers': this.headers});
  }

  getCommentsByPostId(postId:number): Observable<any>{
    return this.httpCli.get(`${this.utilityService.getServerDomain()}/api/feed/comment/post/${postId}`, {'headers': this.headers})
  }
}

