import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { result } from 'lodash';
import { Post } from 'src/app/models/Post';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  /* it('should be created', () => {
    expect(service).toBeTruthy();
  }); */

  it('should return post when create Post called', () => {
    service.createPost(new Post).subscribe((result: Post) => {
      expect(result).toEqual(new Post)
    })

    const req = httpMock.expectOne('http://54.167.107.251:9000/api/post', 'create new post');
    expect(req.request.method).toBe('POST');

    req.flush(new Post);

    httpMock.verify();
  })

  it('should return allPosts when getAllPosts called', () => {
    service.getAllPosts().subscribe((result: any) => {
      expect(result).toEqual(new Post)
    })

    const req = httpMock.expectOne('http://54.167.107.251:9000/api/feed/0', 'get all posts first page');
    expect(req.request.method).toBe('GET');

    req.flush(new Post);

    httpMock.verify();
  })

  it('should return post when getPostByUserId called', () => {
    service.getPostsByUserId(1).subscribe((result: Post) => {
      expect(result).toEqual(new Post)
    })

    const req = httpMock.expectOne('http://54.167.107.251:9000/api/post/userId/1', 'get post by user id');
    expect(req.request.method).toBe('GET')

    req.flush(new Post)

    httpMock.verify();
  })

  it('should return posts by page count', () => {
    const pageCount = 2
    service.getNextPageOfPosts(pageCount).subscribe((result: any) => {
      expect(result).toEqual(new Post)
    })

    const req = httpMock.expectOne(`http://54.167.107.251:9000/api/feed/${pageCount}`, 'get posts by page number');
    expect(req.request.method).toBe('GET')

    req.flush(new Post)

    httpMock.verify();
  })
});
