import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

  constructor(private httpCli: HttpClient, private utilityService: UtilityService) { }

  createPost(post: Post) {
    // userId is hard coded for now, needs to be replaced with userId from sessionStorage
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/feed/post`, post, {'headers': this.headers})
  }

  getAllPosts() {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/post/feed/0`,  {'headers': this.headers} )
  }

  getPostsByUserId(userId: number){
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/post/userId/${userId}`, {'headers': this.headers})
  }

  getAllPostsForOneUser(id: number) {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/post/userId/${id}`, {'headers': this.headers})
  }

  getNextPageOfPosts(pageCount: number) {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/post/feed/${pageCount}`, {'headers': this.headers})
  }
}
