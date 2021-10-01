import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  pageCount = 1;

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
  wholeList: Array<any> = []; 
  listNum: number = 5;
  followLabel : string = "Follow";
  followed: boolean = false;
  followers: number = 0;
  following: any[];
  followingUsers: any[] = [];
  allFollowing: Subscriber<any> = new Subscriber;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userObj')).userId;

    this.userService.getAllUsers().subscribe(users => {
      this.wholeList = users.data;
      this.userList = this.wholeList.slice(0, this.listNum)
      console.log(this.userList)
    })

    this.userService.getUserById(this.userId).subscribe(responseData => {
      this.following = responseData.data.user_following;
    })
    setTimeout(()=>{
    this.following.forEach(index=> {this.userService.getUserById(index).subscribe(specificUser => {
      if(specificUser.success){
       this.followingUsers.push(specificUser.data); 
      }
    })})
    }, 500)
  }

  
  follow(userIdFollow: number){
    console.log(this.userId)
    console.log(userIdFollow)
    
    if(!this.followed){
      console.log("trying to follow")
     this.userService.followUser(userIdFollow, this.userId).subscribe(responseData =>{
      console.log(responseData) 
      if(responseData.success){
        console.log("trying to unfollow")
         this.followLabel = "Unfollow"
         console.log("followed user")
       }else{
         console.log(responseData);

       }
    })
  }
    else{
      this.userService.unfollowUser(userIdFollow, this.userId).subscribe(response=>{
        if(response.success){
          this.followLabel = "Follow"
          console.log("unfollowed user")
        }}
    )}
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log("bottom hit")
      this.listNum = this.listNum + 5;
      this.userList = this.wholeList.slice(0, this.listNum);
      console.log(this.userList)
    }
  }

}
