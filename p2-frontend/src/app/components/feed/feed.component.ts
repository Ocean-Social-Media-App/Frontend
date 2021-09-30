import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() pageCount: number = 1;
  userId: number = this.route.snapshot.params["id"];
  postList: Array<any> = [];
  listTemp: Array<Post> = [];
  observer: Subscription = new Subscription;
  stringInput: string = "";
  navigationSubscription: any;
  userObj;
  // put object for all users here

  constructor(private postServ: PostService, private router: Router, private route: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    console.log(this.pageCount);
    /* console.log(this.pageCount); */
    this.populateFeed();

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.pageCount.currentValue);
    this.postServ.getNextPageOfPosts(changes.pageCount.currentValue)
      .subscribe(posts => {
        console.log(posts);
        posts.data.forEach((post: any) => {
          this.postList.push(post);
        });
      })
      this.populateFeed();
  }

  ngOnDestroy(): void{
    this.observer.unsubscribe();

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngDoCheck(): void{
    //this.listTemp = this.postList.filter(post => post.postText?.startsWith(this.stringInput))
  }


  populateFeed(){
    /* console.log(this.userId) */
    if (this.userId == undefined) {
      this.postServ.getAllPosts().subscribe(posts => {
        this.postList = posts.data;
        console.log(posts.data)
      })
    } else {
      this.postServ.getAllPostsForOneUser(this.userId, this.pageCount)
      .subscribe(posts => {
        this.postList = posts.data;
        console.log(posts.data.content)
      })
    }
  }
}
