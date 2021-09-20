import { Component, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { Comment } from 'src/app/models/Comment';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/services/comment/comment.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Output()
  firstName: string =  "";
  username: string = "";
  proPicUrl: string = "";

  userObj :any = {}
  postId:number = 0;
  userId:number = 0;

  @Input()
  comment: Comment = {
    commentId: 0,
    commText: "",
    post : {
      postId: 0,
      postPicUrl: undefined,
      postText: undefined,
      postYouUrl: undefined,
      user : {
        userId: undefined,
        username: "",
        password: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        aboutMe: undefined,
        bday: undefined,
        proPicUrl: undefined
      }
    },
    user : {
      userId: 0,
      username: "",
      password: undefined,
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      aboutMe: undefined,
      bday: undefined,
      proPicUrl: undefined
    }
  }

  constructor(private commentService: CommentService, private userService: UserService) { }

  ngOnInit(): void {
    this.userId =  JSON.parse(sessionStorage.getItem('userObj')!).userId

    this.userService.getUserById(this.userId).pipe(first()).subscribe(
      data =>{
        console.log(data);
        this.firstName = data.firstName;
        this.proPicUrl = data.proPicUrl;
        this.username = data.username;
      }
    )
  }

}
