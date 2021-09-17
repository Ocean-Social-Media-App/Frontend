import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  updateLabel: string = "Update Profile"
  viewOrUpdate: string = 'view';

  firstName: string = '';
  lastName: string = '';
  username: string = '';
  bday: string = '';
  aboutMe: string = '';
  proPicUrl = '';

  // variables to be set from session storage
  userObj: any = {};

  constructor() { }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.userObj);
    console.log("PROFILE DATA FROM LOGIN");
    console.log(this.userObj);

    this.firstName = this.userObj.firstName;
    this.lastName = this.userObj.lastName;
    this.username = this.userObj.username;
    this.bday = this.userObj.bday;
    this.aboutMe = this.userObj.aboutMe;
    this.proPicUrl = this.userObj.proPicUrl;
  }

  updateProfile(){
    console.log("UPDATE PROFILE CLICKED");
    if (this.viewOrUpdate == 'view') {
      this.viewOrUpdate = 'update';
      this.updateLabel = 'View Profile';
    } else {
      this.viewOrUpdate = 'view';
      this.updateLabel = 'Update Profile';
    }
    console.log(this.viewOrUpdate);
  }

  @Output() public hide: EventEmitter<void> = new EventEmitter();
  toggleProfile(event: any) {
    this.hide.emit();
  }

  receiveChildData(data: string) {
    this.viewOrUpdate = data;
  }
}
