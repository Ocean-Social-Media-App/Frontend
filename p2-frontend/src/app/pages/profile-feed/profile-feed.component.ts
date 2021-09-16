import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.css']
})
export class ProfileFeedComponent implements OnInit {

  userClick=0;
  constructor() { }

  ngOnInit(): void {
  }

}
