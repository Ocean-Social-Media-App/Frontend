import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent implements OnInit {

  @Output()
  eventFromActionMenu: EventEmitter<boolean> = new EventEmitter();

  @Output()
  eventFromActionNotification: EventEmitter<boolean> = new EventEmitter();

  _postCheck: boolean = false;
  _notificationCheck: boolean = false;
  isChecked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  userIsPosting() {
    this._notificationCheck = false;
    this._postCheck = !this._postCheck;
    console.log(this._postCheck);
    this.eventFromActionMenu.emit(this._postCheck);
  }

  notificationsDisplay() {
    this._postCheck = false;
    this._notificationCheck = !this._notificationCheck;
    console.log(this._notificationCheck);
    this.eventFromActionNotification.emit(this._notificationCheck);
  }

  darkMode() {
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    console.log(this.isChecked);
  }

}
