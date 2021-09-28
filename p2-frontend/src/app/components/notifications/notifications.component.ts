import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  viewNotifications(){
    alert("notifications works")
  }

}
