import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';
import { YouTubeValidator } from 'src/app/validators/youtube-validator';

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.css']
})
export class NewPostFormComponent implements OnInit{

  submitLabel: string = "Submit";
  imageUrl: string = "";
  userId: number = 0;
  @Input() userObj = {};

  imageForm = this.fb.group({
    imageFile: [null]
  })

  newPostForm = this.fb.group({
    postPicUrl: [''],
    postText: ['', [Validators.required, Validators.maxLength(250)]],
    postYouUrl: [''],
    user: [{userId:this.userId}]
  })
  // link for testing purposes
  // https://www.youtube.com/watch?v=gc4pxTjii9c
  constructor(private fb: FormBuilder, private userService: UserService, private postService: PostService, private router: Router) { }
  ngOnInit(): void {
    this.userId =  JSON.parse(sessionStorage.getItem('userObj')!).userId
  }

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
        userId: this.userId
      }
    })

    this.postService.createPost(this.newPostForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Successfully created post");
          console.log(data);
          this.router.navigateByUrl(this.router.url);
          this.postText.reset();
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
            console.log(this.newPostForm.value)
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

  get postText() { return this.newPostForm.get('postText') }
  get postYouUrl() { return this.newPostForm.get('postYouUrl') }
}
