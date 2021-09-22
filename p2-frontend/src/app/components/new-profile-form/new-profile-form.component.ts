import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { DateValidator } from 'src/app/validators/date-validator';

@Component({
  selector: 'app-new-profile-form',
  templateUrl: './new-profile-form.component.html',
  styleUrls: ['./new-profile-form.component.css']
})
export class NewProfileFormComponent implements OnInit {

  submitLabel: string = 'Submit';
  uploadLabel: string = 'Upload';
  current: string = 'image';
  imageUrl: string = 'assets/default.jpg';


  // variables to be set from session storage
  userObj: any = {};

  imageForm = this.fb.group({
    image: [null, Validators.required]
  })

  newProfileForm = this.fb.group({
    username: [''],
    email: [''],
    firstName: [''],
    lastName: [''],
    password: [''],
    proPicUrl: [''],
    bday: ['', [Validators.required, DateValidator.usDate]],
    aboutMe: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj')!);
    console.log(this.userObj);
  }

  onFileInput(event: any) {
    if (event.currentTarget.files.length > 0) {
      const file = event.currentTarget.files[0];
      this.imageForm.get('image')?.setValue(file, {emitModelToViewChange: false});
      console.log(file);
    }
  }

  switchForm(event: any) {
    this.current = "details";
  }

  createProfile() {
    //this.userId = Number(sessionStorage.getItem('userId'));
    this.newProfileForm.patchValue({
      username: this.userObj.username,
      email: this.userObj.email,
      firstName: this.userObj.firstName,
      lastName: this.userObj.lastName,
      password: this.userObj.password,
      proPicUrl: this.imageUrl,
    })

    this.userObj["bday"] = this.newProfileForm.get('bday')?.value;
    this.userObj["aboutMe"] = this.newProfileForm.get('aboutMe')?.value;

    sessionStorage.setItem('userObj', JSON.stringify(this.userObj));

    console.log(this.newProfileForm.value);

    this.userService.register(this.newProfileForm.value)
    .pipe(first())
    .subscribe(
      data => {
        console.log("Profile created");
        this.userObj["userId"] = data.data.userId;

        sessionStorage.setItem('userObj', JSON.stringify(this.userObj));
        this.router.navigateByUrl('userFeed');
      },
      error => {
        console.log("Unable to create profile");
        console.log(error);
      }
    )
  }

  uploadImageAndCreateProfile(event: any) {
    if (this.imageForm.get('image')?.value != null) {
      const formData = new FormData();
      formData.append('file', this.imageForm.get('image')!.value);

        this.userService.addProfileImage(formData)
        .pipe(first())
        .subscribe(
          data => {
            console.log("Successfully uploaded image");
            this.userObj["proPicUrl"] = data.data;

            console.log(this.userObj);

            this.imageUrl = data.data;
            this.createProfile();
          },
          error => {
            console.log("upload failed");
            console.log(error);
          }
        )
    } else {
      this.userObj["proPicUrl"] = this.imageUrl;
      this.createProfile();
    }
  }

  get bday() { return this.newProfileForm.get('bday') }
  get aboutMe() { return this.newProfileForm.get('aboutMe') }
}
