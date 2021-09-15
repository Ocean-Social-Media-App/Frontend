import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpCli: HttpClient) { }

  createPost(post: Post) {
    // userId is hard coded for now, needs to be replaced with userId from sessionStorage
    return this.httpCli.post(`http://localhost:9000/api/post`, post, {withCredentials: true})
  }

  getAllPosts() {
    return this.httpCli.get<any>(`http://localhost:9000/api/feed/0`,  {withCredentials: true} )
  }


}
