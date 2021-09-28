import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-following-page',
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.css']
})
export class FollowingPageComponent implements OnInit {

  following: any[];
  loggedInUser:number;
  userObject:any;
  userId: number = this.route.snapshot.params["id"];
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.userId)
    this.userService.getAllFollowing(this.userId).subscribe(responseData =>{
      console.log(sessionStorage.getItem('JWT'))
      console.log(responseData)
    })
  }

  toUserProfile(userId:number){
    this.router.navigateByUrl(`/profile-feed/${userId}`)
  }

}
