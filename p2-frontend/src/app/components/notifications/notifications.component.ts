import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Array<any> = [];
  userId: number = 0;
  @Input() 
  userObj: any;
  @Input()
  lastNotification: number = 0;
  observer: Subscription = new Subscription();

  constructor(private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj')!);
    if(this.userObj == null) this.router.navigateByUrl('');
    console.log(this.userObj);
    this.userId = this.userObj.userId;
    console.log(this.userId);

    this.getAllNotifications();
  }

  ngOnDestroy(): void {
    this.observer.unsubscribe();
  }

  getAllNotifications() {
    this.observer.unsubscribe();
    this.observer = this.userService.getUserNotifications(this.userId).subscribe(notification => {
      this.notifications = notification.data
    })
  }

}
