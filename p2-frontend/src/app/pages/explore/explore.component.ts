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
  userList: Array<any> = []; 
  wholeList: Array<any> = []; 
  listNum: number = 5;
  
  following: any[];
  observer: Subscriber<any> = new Subscriber;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userObj')).userId;

    this.userService.getAllUsers().subscribe(users => {
      this.wholeList = users.data;
      for(let item in this.wholeList) {
        this.wholeList[item].followLabel = "Follow";
      }
      
      this.userList = this.wholeList.slice(0, this.listNum)
      for (let user of this.wholeList) {
        
        this.userService.getUserById(this.userId).subscribe(responseData => {
          this.following = responseData.data.user_following;
          for (let followee of this.following) {
            if(user.userId == followee) {
              user.followLabel = "Unfollow";
            }
          }
        })}
    })   
  }

  
  follow(userFollow: any){
        
    if(userFollow.followLabel == "Follow"){
      console.log("trying to follow")
      this.userService.followUser(userFollow.userId, this.userId).subscribe(responseData =>{
      
      if(responseData.success){
         userFollow.followLabel = "Unfollow"
         console.log("followed user")
       }else {
         
       }
    })
  }else {
    this.userService.unfollowUser(userFollow.userId, this.userId).subscribe(response=>{
        if(response.success){
          userFollow.followLabel = "Follow"
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
