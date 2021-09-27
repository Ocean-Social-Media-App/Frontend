import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following-page',
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.css']
})
export class FollowingPageComponent implements OnInit {

  following: any[];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toUserProfile(userId:number){
    this.router.navigateByUrl(`/profile-feed/${userId}`)
  }

}
