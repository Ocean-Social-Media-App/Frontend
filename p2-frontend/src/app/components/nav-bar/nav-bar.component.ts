import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnChanges {

  userId!: number;
  _isInNav : boolean = true;
  logOutLabel: string = 'Logout';
  profilePosition: string = "-64rem";
  
  users: Array<User> = [];

  @Input()
  searchInput: string = "";

  constructor(private userService: UserService, private router: Router) { }
 
  ngOnChanges(changes: SimpleChanges): void {
    this.users = this.users.filter(user => user.username.startsWith(this.searchInput))
  }


  ngOnInit(): void {
    this.userId = JSON.parse(sessionStorage.getItem('userObj')!).userId;

    this.userService.getAllUsers().subscribe(users => {
      this.users = users
      this.userService.userData = users
      console.log(users)
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
