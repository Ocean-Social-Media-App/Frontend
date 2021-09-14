import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/app/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpCli: HttpClient) { }

  createComment(comment: Comment) {
    return this.httpCli.post(`http://localhost:9000/api/comment`, comment, {withCredentials: true});
  }
}
