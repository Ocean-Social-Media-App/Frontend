import { parseHostBindings } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
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
import { UserService } from 'src/app/services/user/user.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges, OnDestroy {
  component: {};
  [x: string]: {};

  userLike: number = 0;
  postLike: number = 0;
  commentCount: number = 0;
  postPic: string = '';
  hasPic: boolean = false;
  hasLink: boolean = false;
  isLiked:boolean = false;
  isBookmarked: boolean = false;
  toggleCommentsText: string = 'view';
  showComments: boolean = false;
  videoId: string = '';
  apiLoaded = false;
  totalLikes:number;
  likesInnerText: string = "";
  likesOnPost: any = [];
  observer: Subscription = new Subscription;

  @Output()
  callPageRefresh: EventEmitter<string> = new EventEmitter();

  likeObj = {
    post: {postId: this.postLike},
    userId: this.userLike
  }

  @Input()
  post: Post = {
    postId: 0,
    postPicUrl: "",
    postText: "",
    postYouUrl: "",
    userId: 0,
    user: {
      userId: undefined,
      username: " ",
      password: undefined,
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      aboutMe: undefined,
      bday: undefined,
      proPicUrl: ""
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

  constructor(private postServ: PostService, private userServ: UserService, private likeService: LikeService, private modalService: NgbModal, private bookmarkService: BookmarkService) { }


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

      this.videoId = getVideoId(this.post.postYouUrl).id;


    }

    this.likeService.checkLike(this.post.postId, this.userLike)
      .pipe(first())
      .subscribe(
        data =>{
          if(data.success == true){
            this.isLiked=true;
          }else{
            this.isLiked=false;
          }
        }
      )
      this.bookmarkService.getBookmarks(this.userLike)
      .pipe(first())
      .subscribe(
        data =>{
          this.isBookmarked = (data.data.indexOf(this.post.postId) > -1)
      });

        this.getLikes();

  }

  ngOnChanges(){
    this.observer = this.userServ.getUserById(this.post.userId).subscribe(userData => {
      if(userData.success){
        this.post.user = userData.data;
      }
    })
  }

  ngOnDestroy(): void {
    this.observer.unsubscribe();
  }

  getLikes(){
    this.likeService.getAllLikesByPost(this.post.postId).subscribe(
      likeData =>{
         if(likeData.success){
            this.totalLikes = likeData.data.length
            this.likesInnerText = this.totalLikes == 1 ? this.totalLikes + " Like" : this.totalLikes + " Likes";
            likeData.data.forEach(element => {
              this.userServ.getUserById(element.userId).subscribe(user =>{
                 this.likesOnPost.push(user.data)
              })
            })
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
  }

  displayModal(){
    this.display = true;

  }

  like(postId:number){


     this.likeService.checkLike(postId, this.userLike)
      .pipe(first())
      .subscribe(
        data =>{
          if(data.success == true){
            this.likeId = data.data
            this.likeService.unLikePost(this.likeId)
            .pipe(first()).subscribe(
              data => {
                this.isLiked = false;
                this.totalLikes -= 1;
                this.likesInnerText = this.totalLikes == 1 ? this.totalLikes + " Like" : this.totalLikes + " Likes";
              },
              error => {

              }
          )
          }else{
            this.likeObj.userId =  this.userLike
            this.likeObj.post.postId = postId


            this.likeService.likePost(this.likeObj)
              .pipe(first()).subscribe(
                data => {
                  this.isLiked = true;
                  this.totalLikes += 1;
                  this.likesInnerText = this.totalLikes == 1 ? this.totalLikes + " Like" : this.totalLikes + " Likes";
                },
                error => {

                }
            )
          }
        }
      )

  }
  bookmark(postId:number){

    this.userServ.getUserById(this.userLike)
     .subscribe(
       data =>{
         if(data.data.bookmarks.indexOf(postId) > -1){


           this.bookmarkService.unBookmarkPost(postId, this.userLike)
           .subscribe(
             data => {
               this.isBookmarked = false;


             },
             error => {

             }
         )
         }else{

           this.bookmarkService.bookmarkPost(postId, this.userLike)
             .subscribe(
               data => {
                 this.isBookmarked = true;

               },
               error => {

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
    this.getLikes()
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
         `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.likesOnPost = [];
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


