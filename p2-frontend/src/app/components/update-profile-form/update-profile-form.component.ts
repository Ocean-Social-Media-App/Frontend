import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.css']
})
export class UpdatePostFormComponent implements OnInit {

  // variables to be set from session storage
  userObj: any = {};

  imageForm = this.fb.group({
    image: [null]
  })

  updateProfileForm = this.fb.group({
    username: [''],
    email: [''],
    firstName: [''],
    lastName: [''],
    password: [''],
    proPicUrl: [''],
    bday: [''],
    aboutMe: ['']
  })

  constructor(private fb: FormBuilder) { }

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

}
