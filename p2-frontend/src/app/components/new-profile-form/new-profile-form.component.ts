import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-profile-form',
  templateUrl: './new-profile-form.component.html',
  styleUrls: ['./new-profile-form.component.css']
})
export class NewProfileFormComponent {

  submitLabel: string = 'Submit';

  newProfileForm = this.fb.group({
    profilePic: [null, Validators.required],
    birthday: ['', Validators.required],
    aboutMe: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  onFileInput(event: any) {

  }

  createProfile(event: any) {}
}
