import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  updateLabel: string = "Update Profile"
  testString1 : string = "You trying to update this Profile!";

  firstName: string = '';
  lastName: string = '';
  username: string = '';
  bday: string = '';
  aboutMe: string = '';

  // variables to be set from session storage
  userObj: any = {};

  constructor() { }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj')!);
    console.log("PROFILE DATA FROM LOGIN");
    console.log(this.userObj);

    this.firstName = this.userObj.firstName;
    this.lastName = this.userObj.lastName;
    this.username = this.userObj.username;
    this.bday = this.userObj.bday;
    this.aboutMe = this.userObj.aboutMe;
  }

  updateProfile(event: any){
    console.log('updateProfile', event)
    alert(this.testString1)
  }

  @Output() public hide: EventEmitter<void> = new EventEmitter();
  toggleProfile() {
    this.hide.emit();
  }
}
