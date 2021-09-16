import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  postList: Array<Post> = [];
  listTemp: Array<Post> = [];
  observer: Subscription = new Subscription;
  stringInput: string = "";
  navigationSubscription: any;
  // put object for all users here

  constructor(private postServ: PostService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) this.ngOnInit();
    })
  }

  ngOnInit(): void {

    // Call the userService getAllUsers endpoint here

    this.postServ.getAllPosts().subscribe(posts => {
      //console.log(posts)
      this.postList = posts.data.content;
      console.log(this.postList)
    })
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

}
