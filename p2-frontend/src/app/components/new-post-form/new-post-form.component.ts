import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.css']
})
export class NewPostFormComponent {

  submitLabel: string = "Submit";
  imageUrl: string = "";
  userId: number = -1;
  @Input() userObj = {};

  imageForm = this.fb.group({
    imageFile: [null]
  })

  newPostForm = this.fb.group({
    postPicUrl: [''],
    postText: ['', Validators.required],
    postYouUrl: [''],
    user: [{}]
  })
  // link for testing purposes
  // https://www.youtube.com/watch?v=gc4pxTjii9c
  constructor(private fb: FormBuilder, private userService: UserService, private postService: PostService) { }

  onFileInput(event: any) {
    if (event.currentTarget.files.length > 0) {
      const file = event.currentTarget.files[0];
      this.imageForm.get('imageFile')?.setValue(file, {emitModelToViewChange: false});
      console.log(file);
    }
  }

  createPost() {
    if (this.newPostForm.invalid) {
      return;
    }

    this.newPostForm.patchValue({
      postPicUrl: this.imageUrl,
      user: {
        userId: JSON.parse(sessionStorage.getItem('userObj')!).userId
      }
    })

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

  // when you call this method check to see if imageForm has non null value first
  uploadImageAndCreatePost(event: any) {
    if (this.imageForm.get('imageFile')?.value != null) {
      const formData = new FormData();
      formData.append('file', this.imageForm.get('imageFile')!.value);

      this.userService.addPostImage(formData)
        .pipe(first())
        .subscribe(
          data => {
            console.log("Successfully uploaded image");
            this.imageUrl = data.data;
            this.createPost();
          },
          error => {
            console.log("upload failed");
            console.log(error);
          }
        )
    } else {
      this.createPost();
    }
  }
}
