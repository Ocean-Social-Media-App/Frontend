import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  jwtToken = sessionStorage.getItem('JWT');

  headers = new HttpHeaders().set('content-type', 'application/json')
                             .set('Access-Control-Allow-Origin', '*')
                             .set('authorization', this.jwtToken);

  constructor(private httpCli: HttpClient, private utilityService: UtilityService) { }

  createPost(post: Post) {
    return this.httpCli.post(`${this.utilityService.getServerDomain()}/api/feed/post`, post, {'headers': this.headers})
  }

  getAllPosts() {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/post/fave/1`,  {'headers': this.headers} )
  }

  getAllPostsForOneUser(id: number, page: number) {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/post/userId/${id}/${page}`, {'headers': this.headers})
  }

  getNextPageOfPosts(pageCount: number) {
    return this.httpCli.get<any>(`${this.utilityService.getServerDomain()}/api/feed/post/fave/${pageCount}`, {'headers': this.headers})
  }
}
