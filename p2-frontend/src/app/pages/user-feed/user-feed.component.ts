import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {

  /* userOne: User = {
    userId: 0,
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    aboutMe: "",
    bday: undefined,
    pro_pic_url: ""
  } */
  
  observer: Subscription = new Subscription;

  constructor(private route: ActivatedRoute, private userServ: UserService) { }

  ngOnInit(): void {
    /* let userId: number = sessionStorage.getItem('key');;
    console.log(userId);

    this.observer = this.userServ.getUserById(userId).subscribe(user => {
      this.userOne = user;
      console.log(user)
    }) */
  }

}
