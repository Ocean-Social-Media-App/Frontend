import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-new-comment-form',
  templateUrl: './new-comment-form.component.html',
  styleUrls: ['./new-comment-form.component.css']
})
export class NewCommentFormComponent {

  submitLabel: string = "Submit";

  newCommentForm = this.fb.group({
    commText: ['', Validators.required],
    post: [{ postId: 1 }],
    user: [{ userId: 1 }]
  })

  constructor(private fb: FormBuilder, private commentService: CommentService) { }

  onClick(event: any) {
    if (this.newCommentForm.invalid) {
      console.log("invalid");
      return;
    }

    console.log("adding comment");

    this.commentService.createComment(this.newCommentForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Successfully created comment");
          console.log(data);
        },
        error => {
          console.log("Failed to create comment");
          console.log(error);
        }
      )
  }
}
