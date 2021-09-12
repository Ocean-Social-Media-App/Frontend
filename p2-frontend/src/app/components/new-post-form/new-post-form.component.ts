import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.css']
})
export class NewPostFormComponent {

  submitLabel: string = "Submit";

  newPostForm = this.fb.group({
    postPicUrl: [null],
    postText: ['', Validators.required],
    postYouUrl: [''],
    user: [{userId: 1}]
  })

  constructor(private fb: FormBuilder, private postService: PostService) { }

  onFileInput(event: any) {

  }

  createPost(event: any) {
    if (this.newPostForm.invalid) {
      return;
    }

    this.postService.createPost(this.newPostForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Successfully created post");
          console.log(data);
        },
        error => {
          console.log("Failed to create post");
          console.log(error);
        }
      )
  }

}
