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

  userId: string = "";
  username: string|null = "";
  proPicUrl: string|null = "";

  constructor() { }

  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userId') || '{}');
    this.username = sessionStorage.getItem('username');
    this.proPicUrl = sessionStorage.getItem('proPicUrl');
  }

}
