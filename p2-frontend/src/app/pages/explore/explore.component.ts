import { Component, Input, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  @Input()
  user: User = {
    userId: undefined,
    username: '',
    password: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    aboutMe: undefined,
    bday: undefined,
    proPicUrl: undefined
  }

  userId: number;
  userIdFollow: number;
  userList: Array<any> = []; 
  followLabel : string = "Follow";
  followed: boolean = false;
  followers: number = 0;
  following: number = 0;
  allFollowing: Subscriber<any> = new Subscriber;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userObj')!).userId;

    this.userService.getAllUsers().subscribe(users => {
     console.log(users)
      this.userList = users.data;
    })
  }

  follow(){
    this.userIdFollow = this.user.userId;
    this.followed = !this.followed;
    if(this.followed)
    {
     this.userService.followUser(this.userIdFollow, this.userId).subscribe(responseData =>{
       if(responseData.success){ 
     this.followers = +this.followers +  1;
     this.followLabel = "Unfollow"
       }
    })
  }
    else{
      this.userService.unfollowUser(this.userIdFollow, this.userId).subscribe(response=>{
        if(response.success){
      this.followers = +this.followers - 1;
      this.followLabel = "Follow"
      }}
      )}
  }

}
