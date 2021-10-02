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
  userview: number = 0;
  pageCount = 1;
  aUser= {
    user: {userId : this.userview }
  }
  
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
  
  
  userId: number = 0;
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
  arrayOfFollowers: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userObj')).userId;

    this.followed = false;

    this.userService.getAllUsers().subscribe(users => {
      this.wholeList = users.data;
      this.userList = this.wholeList.slice(0, this.listNum)
      console.log(this.userList)

      for(let user of this.wholeList){
        this.userService.getUserById(user.userId).subscribe(follows =>{
          console.log(follows)
          follows.data.followers.forEach(element => {
            console.log(element)
           this.userService.getUserById(element).subscribe(followerUser => {
           this.arrayOfFollowers.push(followerUser);
         })
        if(element == this.userId){
          /* this.followLabel = "Unfollow"; */
          console.log(element)
          console.log(this.userId)
          this.followed = true;
        }else{
          this.followed = false;
        }
      });
    })
      }
    })

   

    
    /* this.userService.getUserById(this.userIdFromParam).subscribe(follows =>{
      follows.data.followers.forEach(element => {
        this.userService.getUserById(element).subscribe(followerUser => {
          this.arrayOfFollowers.push(followerUser);
        })
       if(element == this.userInSession){
         this.followLabel = "Unfollow";
         this.followed = true;
       }
     });
     this.following = follows.data.user_following.length;
     this.followers = follows.data.followers.length;

   }) */

   /*  this.userService.getUserById(this.userId).subscribe(responseData => {
      this.following = responseData.data.user_following;
    })
    setTimeout(()=>{
    this.following.forEach(index=> {this.userService.getUserById(index).subscribe(specificUser => {
      if(specificUser.success){
       this.followingUsers.push(specificUser.data); 
      }
    })})
    }, 500) */


  }

  
  follow(userIdFollow: number){
    console.log(this.userId)
    console.log(userIdFollow)
    
    if(!this.followed){
      console.log("trying to follow")
     this.userService.followUser(userIdFollow, this.userId).subscribe(responseData =>{
      console.log(responseData) 
      if(responseData.success){
         console.log("followed user")
       }
    })
    }
    else{
      this.userService.unfollowUser(userIdFollow, this.userId).subscribe(response=>{
        if(response.success){
          /* this.followLabel = "Follow" */
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
