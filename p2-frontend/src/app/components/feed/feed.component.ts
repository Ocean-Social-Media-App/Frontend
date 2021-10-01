import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() pageCount: number = 1;
  postList: Array<any> = [];
  postObs: Subscription = new Subscription();
  bookmarkObs: Subscription = new Subscription();
  stringInput: string = "";
  navigationSubscription: any;
  userObj: any;
  updateFeed: boolean;
  hasReachedLastPage: boolean = false;

  constructor(private postServ: PostService, private bookmarkServ: BookmarkService, private router: Router, private route: ActivatedRoute) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.populateFeed();
  }

  ngOnChanges(changes: SimpleChanges) {
    /* if (!this.isBookmarked) {
      this.postObs = this.postServ.getNextPageOfPosts(changes.pageCount.currentValue)
      .subscribe(posts => {
        this.updateFeed = posts.success;
        if(posts.success){
          posts.data.forEach((post: any) => {
            this.postList.push(post);
          });
      }
      })
    } */
  }

  ngOnDestroy(): void{
    this.postObs.unsubscribe();
    this.bookmarkObs.unsubscribe();

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  populateFeed(){

    if (this.route.snapshot.params["id"]) {
      this.getOneUsersPosts();
    } else if (this.router.url == '/bookmarks') {
      this.getBookmarkedPosts();
    } else {
      this.getAllFollowedPosts();
    }

  }

  getBookmarkedPosts() {
    this.bookmarkObs = this.bookmarkServ.getBookmarks(this.userObj.userId, this.pageCount).subscribe((response)=>{
      response.data.forEach(bookmarkId => {
        this.postObs = this.postServ.getPostByPostId(bookmarkId).subscribe((postResponse)=>{
          this.postList.push(postResponse.data);
        })
      });
    })
  }

  getAllFollowedPosts() {
    this.postObs = this.postServ.getNextPageOfPosts(this.pageCount).subscribe(posts => {
      if (!posts.success) {
        this.hasReachedLastPage = true;
      } else {
        this.postList = posts.data;
      }
    })
  }

  getOneUsersPosts() {
    this.postObs = this.postServ.getAllPostsForOneUser(this.route.snapshot.params["id"], this.pageCount)
    .subscribe(posts => {
        this.postList = posts.data;
    })
  }
}
