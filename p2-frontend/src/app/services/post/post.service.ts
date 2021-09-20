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
    return this.httpCli.post(`ec2-54-167-107-251.compute-1.amazonaws.com/api/post`, post, {withCredentials: true})
  }

  getAllPosts() {
    return this.httpCli.get<any>(`ec2-54-167-107-251.compute-1.amazonaws.com/api/feed/0`,  {withCredentials: true} )
  }

  getPostsByUserId(userId: number){
    return this.httpCli.get<any>(`ec2-54-167-107-251.compute-1.amazonaws.com/api/post/userId/${userId}`, {withCredentials: true})
  }

  getAllPostsForOneUser(id: number) {
    return this.httpCli.get<any>(`ec2-54-167-107-251.compute-1.amazonaws.com/api/post/userId/${id}`, {withCredentials: true})
  }

  getNextPageOfPosts(pageCount: number) {
    return this.httpCli.get<any>(`ec2-54-167-107-251.compute-1.amazonaws.com/api/feed/${pageCount}`, {withCredentials: true})
  }
}
