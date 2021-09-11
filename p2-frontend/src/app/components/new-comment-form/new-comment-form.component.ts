import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-comment-form',
  templateUrl: './new-comment-form.component.html',
  styleUrls: ['./new-comment-form.component.css']
})
export class NewCommentFormComponent {

  submitLabel: string = "Submit";

  newCommentForm = this.fb.group({
    commText: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }
}
