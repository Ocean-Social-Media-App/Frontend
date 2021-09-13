import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {

  userId: string|null = "";
  username: string|null = "";
  proPicUrl: string|null = "";

  constructor() { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.username = sessionStorage.getItem('username');
    this.proPicUrl = sessionStorage.getItem('proPicUrl');
  }

}
