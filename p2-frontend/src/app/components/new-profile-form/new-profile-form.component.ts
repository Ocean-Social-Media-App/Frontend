import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-profile-form',
  templateUrl: './new-profile-form.component.html',
  styleUrls: ['./new-profile-form.component.css']
})
export class NewProfileFormComponent {

  submitLabel: string = 'Submit';
  uploadLabel: string = 'Upload';
  current: string = 'image';

  imageForm = this.fb.group({
    image: [null]
  })

  newProfileForm = this.fb.group({
    birthday: ['', Validators.required],
    aboutMe: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private router: Router) { }

  onFileInput(event: any) {

  }

  createProfile(event: any) {
    this.router.navigateByUrl('userFeed');
  }

  uploadImage(event: any) {
    this.current = "details";
  }
}
