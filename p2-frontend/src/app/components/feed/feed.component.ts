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
  @Input() isBookmarked: boolean = false;
  userId: number = this.route.snapshot.params["id"];
  postList: Array<any> = [];
  listTemp: Array<Post> = [];
  postObs: Subscription = new Subscription();
  bookmarkObs: Subscription = new Subscription();
  stringInput: string = "";
  navigationSubscription: any;
  userObj;
  updateFeed: boolean;
  // put object for all users here

  constructor(private postServ: PostService, private bookmarkServ: BookmarkService, private router: Router, private route: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.populateFeed();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isBookmarked) {
      this.postObs = this.postServ.getNextPageOfPosts(changes.pageCount.currentValue)
      .subscribe(posts => {
        this.updateFeed = posts.success;
        if(posts.success){
        posts.data.forEach((post: any) => {
          this.postList.push(post);
        });
      }
      })
    }
  }

  ngOnDestroy(): void{
    this.postObs.unsubscribe();
    this.bookmarkObs.unsubscribe();

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  populateFeed(){
    if(this.isBookmarked){
      this.postList = [];
      this.bookmarkObs = this.bookmarkServ.getBookmarks(this.userObj.userId, this.pageCount).subscribe((response)=>{
        console.log(response);

        response.data.forEach(bookmarkId => {
          this.postObs = this.postServ.getPostByPostId(bookmarkId).subscribe((postResponse)=>{
            console.log(postResponse);

            this.postList.push(postResponse.data);
          })
        });
      })
    } else if (this.userId == undefined) {
      this.postObs = this.postServ.getNextPageOfPosts(this.pageCount).subscribe(posts => {
        this.postList = posts.data;

        console.log(posts)
      })
    } else {
      this.postObs = this.postServ.getAllPostsForOneUser(this.userId, this.pageCount)
      .subscribe(posts => {
        this.postList = posts.data;
      })
    }
  }
}
