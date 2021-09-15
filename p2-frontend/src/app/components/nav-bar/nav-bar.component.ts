import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  _isInNav : boolean = true;
  logOutLabel: string = 'Logout';
  profilePosition: string = "-64rem";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
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

}
