import { parseHostBindings } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import getVideoId from 'get-video-id';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Like } from 'src/app/models/Like';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { LikeService } from 'src/app/services/like/like.service';
import { PostService } from 'src/app/services/post/post.service';
import {NgbModal, ModalDismissReasons}
      from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  component: {};
  [x: string]: {};

  userLike: number = 0;
  postLike: number = 0;
  commentCount: number = 0;
  postPic: string = '';
  hasPic: boolean = false;
  hasLink: boolean = false;
  isLiked:boolean = false;
  toggleCommentsText: string = 'view';
  showComments: boolean = false;
  videoId: string = '';
  apiLoaded = false;
  totalLikes:number;
  likesInnerText: string = "";
  likesOnPost: any = [];

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
      username: " ",
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
  likeId!: 0;

  constructor(private postServ: PostService, private likeService: LikeService, private modalService: NgbModal,) { }

  ngOnInit(): void {

    this.userLike = JSON.parse(sessionStorage.getItem('userObj')!).userId

    if(this.post.postPicUrl != null){
      this.hasPic = true;
    }

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    if(this.post.postYouUrl !== ''){
      this.hasLink = true;
      console.log(this.post.postYouUrl);
      this.videoId = getVideoId(this.post.postYouUrl).id;
      console.log(this.videoId);

    }

    this.likeService.checkLike(this.post.postId, this.userLike)
      .pipe(first())
      .subscribe(
        data =>{
          /* console.log(data); */
          if(data.success == true){
            this.isLiked=true;
          }else{
            this.isLiked=false;
          }
        }
      )

        this.getLikes();

    /* this.postServ.getAllPosts().subscribe(posts => {
      this.postList = posts.results;
    }) */
  }

  getLikes(){
    this.likeService.getAllLikesByPost(this.post.postId).subscribe(
      likeData =>{
         if(likeData.success){
            this.totalLikes = likeData.data.length
            this.likesInnerText = this.totalLikes == 1 ? this.totalLikes + " Like" : this.totalLikes + " Likes";
            this.likesOnPost = likeData.data;
        } 
      }
    )
  }


  toggleComments() {
    if (this.toggleCommentsText == 'view') {
      this.toggleCommentsText = 'hide';

    } else {
      this.toggleCommentsText = 'view';
    }

    this.showComments = !this.showComments;
  }

  exit(){
    this.display = false;
    /* this.modal.style.display = 'none'; */
  }

  displayModal(){
    this.display = true;

  }

  like(postId:number){
     console.log(postId)

     this.likeService.checkLike(postId, this.userLike)
      .pipe(first())
      .subscribe(
        data =>{
          if(data.success == true){
            //already liked
            this.likeId = data.data
            this.likeService.unLikePost(this.likeId)
            .pipe(first()).subscribe(
              data => {
                this.isLiked = false;
                console.log("Successfully unliked post")
                console.log(data)
                this.getLikes();
              },
              error => {
                console.log("Failed to unlike post")
                console.log(error);
              }
          )
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
                  this.getLikes();
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

  receiveCommentCount(count: number) {
    this.commentCount = count;
  }

  open(content: any) {
    
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
