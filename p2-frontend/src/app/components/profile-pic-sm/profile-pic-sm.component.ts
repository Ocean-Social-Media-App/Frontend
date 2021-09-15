import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile-pic-sm',
  templateUrl: './profile-pic-sm.component.html',
  styleUrls: ['./profile-pic-sm.component.css']
})
export class ProfilePicSmComponent implements OnInit {

  profilePic: string = '';
  
  constructor() { }

  ngOnInit(): void {
    this.profilePic = JSON.parse(sessionStorage.getItem('userObj')!).proPicUrl;
 
  }

}
