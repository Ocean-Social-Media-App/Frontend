import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile-pic-sm',
  templateUrl: './profile-pic-sm.component.html',
  styleUrls: ['./profile-pic-sm.component.css']
})
export class ProfilePicSmComponent implements OnInit {

  user: User = {
    userId: 0,
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    aboutMe: "",
    bday: undefined,
    proPicUrl: ""
  }
  constructor() { }

  ngOnInit(): void {
  }

}
