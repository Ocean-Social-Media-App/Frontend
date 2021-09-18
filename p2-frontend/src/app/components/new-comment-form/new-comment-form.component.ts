import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-new-comment-form',
  templateUrl: './new-comment-form.component.html',
  styleUrls: ['./new-comment-form.component.css']
})
export class NewCommentFormComponent implements OnInit {

  submitLabel: string = "Submit";

  user:number = 0 ;

  @Input()
  post:number|undefined = 0;

  newCommentForm = this.fb.group({
    commText: ['', [Validators.required, Validators.maxLength(150)]],
    post: [{postId : this.post}],
    user: [{userId : this.user}]

  })

  constructor(private fb: FormBuilder, private commentService: CommentService) { }
  ngOnInit() {
    this.user =  JSON.parse(sessionStorage.getItem('userObj')!).userId

  }

 onClick(event: any) {
    if (this.newCommentForm.invalid) {
      console.log("invalid");
      return;
    }

    console.log("adding comment");

   this.newCommentForm.patchValue({
    post: {postId: this.post},
    user: {userId: this.user}
  })
  console.log(this.newCommentForm.value)

    this.commentService.createComment(this.newCommentForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Successfully created comment");
          console.log(data);
          window.location.reload();

        },
        error => {
          console.log("Failed to create comment");
          console.log(error);
        }
      )
  }

  get commText() { return this.newCommentForm.get('commText') }
}
