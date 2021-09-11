import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.css']
})
export class NewPostFormComponent {

  submitLabel: string = "Submit";

  newPostForm = this.fb.group({
    postImage: [null],
    postText: ['', Validators.required],
    postVideoUrl: ['']
  })

  constructor(private fb: FormBuilder) { }

  onFileInput(event: any) {

  }

}
