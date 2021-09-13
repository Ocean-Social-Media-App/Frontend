import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  /* postList: Array<Post> = [];
  listTemp: Array<Post> = [];
  observer: Subscription = new Subscription;
  stringInput: string = ""; */

  @Input()
  post: Post = {
    postId: 0,
    postPicUrl: "",
    postText: "",
    postYouUrl: "",
    user: 0,
  }

  user: User = {
    userId: 0,
    firstname: "",
    username: "",
    pro_pic_url: "",
    password: "",
    email: "",
    lastname: "",
    aboutMe: "",
    bday: undefined
  }

  constructor(private postServ: PostService) { }

  ngOnInit(): void {
    /* this.postServ.getAllPosts().subscribe(posts => {
      this.postList = posts.results;
    }) */
  }

 /*  ngOnDestroy(): void{
    this.observer.unsubscribe();
  }

  ngDoCheck(): void{
    this.listTemp = this.postList.filter(post => post.postText?.startsWith(this.stringInput))
  } */

}
