import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.css']
})
export class UpdatePostFormComponent implements OnInit {

  // variables to be set from session storage
  userObj: any = {};
  @Output() outputFromChild: EventEmitter<string> = new EventEmitter();
  outputText: string = 'view';

  imageForm = this.fb.group({
    image: [null]
  })

  updateProfileForm = this.fb.group({
    username: [''],
    email: [''],
    firstName: [''],
    lastName: [''],
    proPicUrl: [''],
    bday: [''],
    aboutMe: ['']
  })

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj')!);
    console.log(this.userObj);

    this.updateProfileForm.get('username')?.setValue(this.userObj.username);
    this.updateProfileForm.get('email')?.setValue(this.userObj.email);
    this.updateProfileForm.get('firstName')?.setValue(this.userObj.firstName);
    this.updateProfileForm.get('lastName')?.setValue(this.userObj.lastName);
    this.updateProfileForm.get('proPicUrl')?.setValue(this.userObj.proPicUrl);
    this.updateProfileForm.get('bday')?.setValue(this.userObj.bday);
    this.updateProfileForm.get('aboutMe')?.setValue(this.userObj.aboutMe);
  }

  onFileInput(event: any) {
    if (event.currentTarget.files.length > 0) {
      const file = event.currentTarget.files[0];
      this.imageForm.get('image')?.setValue(file, {emitModelToViewChange: false});
      console.log(file);
    }
  }

  uploadImageAndUpdateProfile(event: any) {
    if (this.imageForm.get('image')?.value != null) {
      console.log('inside IF');

      const formData = new FormData();
      formData.append('file', this.imageForm.get('image')!.value);
      console.log(this.imageForm.value);

      this.userService.addProfileImage(formData)
        .subscribe(
          data => {
            console.log("Successfully uploaded image");
            console.log(data);

            this.updateProfileForm.patchValue({
              proPicUrl: data.data
            })

            this.updateProfile();
            this.outputFromChild.emit(this.outputText);
            this.router.navigateByUrl('userFeed');
          }
        )
    } else {
      console.log('inside ELSE');
      this.updateProfile();
      this.outputFromChild.emit(this.outputText);
      this.router.navigateByUrl('userFeed');
    }
  }

  updateProfile() {
    this.userService.updateProfile(this.updateProfileForm.value)
      .subscribe(
        user => {
          console.log("Profile upadted");
          console.log(user);
          this.userObj = user.data;
          sessionStorage.setItem('userObj', JSON.stringify(this.userObj));
        },
        error => {
          console.log("Unable to update profile");
          console.log(error);
        }
      )
  }

}
