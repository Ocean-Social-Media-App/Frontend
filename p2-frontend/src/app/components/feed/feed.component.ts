import { Component, OnInit } from '@angular/core';
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

  
  constructor(private postServ: PostService) { }

  ngOnInit(): void {
    this.postServ.getAllPosts().subscribe(posts => {
      //console.log(posts)
      this.postList = posts.data.sort().reverse();
      console.log(this.postList)
    })
  }

  ngOnDestroy(): void{
    this.observer.unsubscribe();
  }

  ngDoCheck(): void{
    //this.listTemp = this.postList.filter(post => post.postText?.startsWith(this.stringInput))
  }

}
