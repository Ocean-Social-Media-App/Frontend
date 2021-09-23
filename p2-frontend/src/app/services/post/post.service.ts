import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpCli: HttpClient, private utilityService: UtilityService) { }

  createPost(post: Post) {
    // userId is hard coded for now, needs to be replaced with userId from sessionStorage
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/feed/post`, post, {withCredentials: true})
  }

  getAllPosts() {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/0`,  {withCredentials: true} )
  }

  getPostsByUserId(userId: number){
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/post/userId/${userId}`, {withCredentials: true})
  }

  getAllPostsForOneUser(id: number) {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/post/userId/${id}`, {withCredentials: true})
  }

  getNextPageOfPosts(pageCount: number) {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/${pageCount}`, {withCredentials: true})
  }
}
