import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-feed-by-user',
  templateUrl: './feed-by-user.component.html',
  styleUrls: ['./feed-by-user.component.css']
})
export class FeedByUserComponent implements OnInit {

  postList: Array<Post> = [];
  listTemp: Array<Post> = [];
  observer: Subscription = new Subscription;
  stringInput: string = "";
  navigationSubscription: any;

  constructor(private route: ActivatedRoute, private postServ: PostService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) this.ngOnInit();
    })
  }

  ngOnInit(): void {
    let userId: number = this.route.snapshot.params["id"];

    // Call the userService getAllUsers endpoint here

    this.postServ.getPostsByUserId(userId).subscribe(posts => {
      console.log(posts)
      this.postList = posts.data;
      console.log(this.postList)
    })
  }

  ngOnDestroy(): void{
    this.observer.unsubscribe();

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
