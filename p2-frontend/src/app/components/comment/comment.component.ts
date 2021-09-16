import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Comment } from 'src/app/models/Comment';
import { CommentService } from 'src/app/services/comment/comment.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  
  
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
    post: undefined,
    user: undefined
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
