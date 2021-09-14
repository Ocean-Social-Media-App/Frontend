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
  user = "";
  
  @Input()
  post: number | undefined = 0;

  newCommentForm = this.fb.group({
    commText: ['', Validators.required],
    post: [{ postId : this.post}],
    user: [{userId : Number(this.user)}]
  })

  constructor(private fb: FormBuilder, private commentService: CommentService) { }
  ngOnInit(): void {
    this.user = sessionStorage.getItem('userId')!
  }

  onClick(event: any) {
    if (this.newCommentForm.invalid) {
      console.log("invalid");
      return;
    }

    console.log("adding comment");
    console.log(this.post)
    console.log(this.user)

    this.newCommentForm.patchValue({postId: this.post})

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
