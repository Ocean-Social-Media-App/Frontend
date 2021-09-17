import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, DoCheck, OnChanges {

  userId!: number;
  _isInNav : boolean = true;
  logOutLabel: string = 'Logout';
  profilePosition: string = "-64rem";
  observer: Subscription = new Subscription();
 
  userList: Array<any> = []; 
  listTemp: Array<User> = [];

 
  searchInput: string = "";

  constructor(private userService: UserService, private router: Router) { }
  ngDoCheck(): void {
    if(this.searchInput != ""){
      this.listTemp = this.userList.filter(user => user.username.startsWith(this.searchInput))
      console.log(this.listTemp)
    }
    
  }
 
  ngOnChanges(): void {
    
  }


  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userObj')!).userId;

    this.userService.getAllUsers().subscribe(users => {
     console.log(users)
      this.userList = users.data;
      console.log(this.userList)
    })
  }

  logout(event: any) {
    this.userService.logout()
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          sessionStorage.clear();
          this.router.navigateByUrl('');
        },
        error => {
          console.log(error);
        }
      );
  }

  toggleProfile(event: any) {
    if (this.profilePosition == "-64rem") {
      this.profilePosition = "0";
    } else {
      this.profilePosition = "-64rem";
    }
  }

  onViewById() {
    this.router.navigateByUrl(`/userFeed?userId=${this.userId}`)
  }

}
