import { Component, Input, OnInit } from '@angular/core';
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
  userList: Array<any> = []; 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userObj')!).userId;

    this.userService.getAllUsers().subscribe(users => {
     console.log(users)
      this.userList = users.data;
    })
  }

}
