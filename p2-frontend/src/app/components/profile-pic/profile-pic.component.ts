import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent implements OnInit {

  fileToUpload: any;
  profilePic: string = '';

  @Input()
  imgSrc: string|undefined = "";

  constructor(private userServ: UserService) { }

  ngOnInit(): void {
    //this.getUserData()
    this.profilePic = JSON.parse(sessionStorage.getItem('userObj')!).proPicUrl;
    console.log(this.profilePic);

  }

}
