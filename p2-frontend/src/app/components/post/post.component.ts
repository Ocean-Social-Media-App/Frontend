import { parseHostBindings } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Like } from 'src/app/models/Like';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { LikeService } from 'src/app/services/like/like.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  userLike: number = 0;
  postLike: number = 0;

  postPic: string = '';
  hasPic: boolean = false;
  hasLink: boolean = false;
  isLiked:boolean = false;

  /* postList: Array<Post> = [];
  listTemp: Array<Post> = [];
  observer: Subscription = new Subscription;
  stringInput: string = ""; */
  likeObj = {
    post: {postId: this.postLike},
    user: {userId: this.userLike}
  }


  @Input()
  post: Post = {
    postId: 0,
    postPicUrl: "",
    postText: "",
    postYouUrl: "",
    user: {
      userId: undefined,
      username: undefined,
      password: undefined,
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      aboutMe: undefined,
      bday: undefined,
      proPicUrl: undefined
    }
  }

  user: User = {
    userId: 0,
    firstName: "",
    username: "",
    proPicUrl: "",
    password: "",
    email: "",
    lastName: "",
    aboutMe: "",
    bday: undefined
  }

  @Output()
  profilePic = this.user.proPicUrl;


  display: boolean = false;



  constructor(private postServ: PostService, private likeService: LikeService) { }

  ngOnInit(): void {
    console.log(this.profilePic)

    this.userLike = JSON.parse(sessionStorage.getItem('userObj')!).userId

    if(this.post.postPicUrl != null){
      this.hasPic = true;
    }

    if(this.post.postYouUrl != null){
      this.hasLink = true;
    }

    this.likeService.checkLike(this.post.postId, this.userLike)
      .pipe(first())
      .subscribe(
        data =>{
          /* console.log(data); */
          if(data.data == true){
            this.isLiked=true;
          }
        }
      )

    /* this.postServ.getAllPosts().subscribe(posts => {
      this.postList = posts.results;
    }) */
  }

 /*  ngOnDestroy(): void{
    this.observer.unsubscribe();
  }*/

/*   ngDoCheck(): void{
  }  */

  exit(){
    this.display = false;
    /* this.modal.style.display = 'none'; */
  }

  displayModal(){
    this.display = true;
    /* this.modal.style.display = 'block'; */
    console.log("clicked")
  }

  like(postId:number){
     console.log(postId)

     this.likeService.checkLike(postId, this.userLike)
      .pipe(first())
      .subscribe(
        data =>{
          console.log(data);
          if(data.data == true){
            console.log("already liked")
          }else{
            this.likeObj.user.userId =  this.userLike
     this.likeObj.post.postId = postId
     /* this.likeObj.patchValue({

     }) */
     console.log(this.likeObj)
     this.likeService.likePost(this.likeObj)
      .pipe(first()).subscribe(
        data => {
          this.isLiked = true;
          console.log("Successfully liked")
          console.log(data)
        },
        error => {
          console.log("Failed to like post")
          console.log(error);
        }
      )
          }
        }
      )

  }

}
