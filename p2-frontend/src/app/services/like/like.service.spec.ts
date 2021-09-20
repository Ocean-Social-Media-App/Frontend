import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Like } from 'src/app/models/Like';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { asyncData } from 'src/testing/async-observable-helpers';
import { LikeService } from './like.service';

describe('LikeService', () => {
  let likeService: LikeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LikeService]
    });

    // inject the service
    likeService = TestBed.inject(LikeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return true when checkLike is called', () => {
    likeService.checkLike(1, 2).subscribe((result: any) => {
      expect(result).toBe(true);
    });

    const req = httpMock.expectOne('http://54.167.107.251:9000/api/like/1/2', 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(true);

    httpMock.verify();
  });

  it('should return likeId when unLikePost called', () => {
    likeService.unLikePost(1).subscribe((result: any) => {
      expect(result).toBe(1);
    });

    const req = httpMock.expectOne('http://54.167.107.251:9000/api/like/1', 'call to unLikePost');
    expect(req.request.method).toBe('DELETE');

    req.flush(1);

    httpMock.verify();
  });

  xit('should return like when likePost called', () => {
    likeService.likePost(new Like()).subscribe((result: Like) => {
      expect(result).toEqual(new Like());
    });

    const req = httpMock.expectOne('http://54.167.107.251:9000/api/like', 'call to likePost');
    expect(req.request.method).toBe('POST');

    req.flush(new Like());

    httpMock.verify();
  });
});
