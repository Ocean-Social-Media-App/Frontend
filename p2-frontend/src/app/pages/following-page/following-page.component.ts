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
  followingUsers: any[] = [];
  loggedInUser:number;
  userObject:any;
  userId: number;
  profilePic: string = "";
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["id"];
    this.userService.getUserById(this.userId).subscribe(responseData => {
      this.following = responseData.data.user_following;
      this.profilePic = responseData.data.proPicUrl;
    })
    setTimeout(()=>{
    this.following.forEach(index=> {this.userService.getUserById(index).subscribe(specificUser => {
      if(specificUser.success){
       this.followingUsers.push(specificUser.data); 
      }
    })})
    }, 500)

  }

  toUserProfile(userId:number){
    this.router.navigateByUrl(`/profile-feed/${userId}`)
  }

}
