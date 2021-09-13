import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-profile-form',
  templateUrl: './new-profile-form.component.html',
  styleUrls: ['./new-profile-form.component.css']
})
export class NewProfileFormComponent {

  submitLabel: string = 'Submit';
  uploadLabel: string = 'Upload';
  current: string = 'image';
  imageUrl: string = '';
  userId: number = -1;
  proPicUrl: string|null = '';

  imageForm = this.fb.group({
    image: [null]
  })

  newProfileForm = this.fb.group({
    userId: [this.userId],
    proPicUrl: [this.proPicUrl],
    birthday: ['', Validators.required],
    aboutMe: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  onFileInput(event: any) {
    if (event.currentTarget.files.length > 0) {
      const file = event.currentTarget.files[0];
      this.imageForm.get('image')?.setValue(file, {emitModelToViewChange: false});
      console.log(file);
    }
  }

  createProfile(event: any) {
    this.userId = Number(sessionStorage.getItem('userId'));
    this.proPicUrl = sessionStorage.getItem('proPicUrl');
    try {
      this.userService.createProfile(this.newProfileForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Profile created");
          console.log(data);
        },
        error => {
          console.log("Unable to create profile");
          console.log(error);
        }
      )
    } finally {
      this.router.navigateByUrl('userFeed');
    }
  }

  uploadImage(event: any) {
    const formData = new FormData();
    formData.append('file', this.imageForm.get('image')!.value);
    try {
      this.userService.addProfileImage(formData)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Successfully uploaded image");
          sessionStorage.setItem('proPicUrl', data.data)
          this.imageUrl = data.data;
        },
        error => {
          console.log("upload failed");
          console.log(error);
        }
      )
    } finally {
      this.current = "details";
    }
  }
}
