import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    postId: 0,
    postText: '',
    postTime: undefined,
    postParentId: 0,
    userId: 0
  }
  toggleCommentsText: string;
  showComments: boolean;
  display: boolean;
  commentCount: number;
  closeResult: string;

  constructor(private commentService: CommentService, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userId =  JSON.parse(sessionStorage.getItem('userObj')).userId
    /* console.log(this.userId) */

    this.userService.getUserById(this.userId).subscribe(
      data =>{
        console.log(data.data);
        this.firstName = data.firstName;
        this.proPicUrl = data.proPicUrl;
        this.username = data.username;
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
