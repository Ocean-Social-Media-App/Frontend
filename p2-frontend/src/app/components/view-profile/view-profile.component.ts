import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  updateLabel: string = "Update Profile"
  testString1 : string = "You trying to update this Profile!";

  firstName: string = '';
  lastName: string = '';
  username: string = '';
  bday: string = '';

  constructor() { }

  ngOnInit(): void {
    this.firstName = sessionStorage.getItem('firstName')!;
    this.lastName = sessionStorage.getItem('lastName')!;
    this.username = sessionStorage.getItem('username')!;
    this.bday = sessionStorage.getItem('bday')!;
  }

  updateProfile(event: any){
    console.log('updateProfile', event)
    alert(this.testString1)
  }

  @Output() public hide: EventEmitter<void> = new EventEmitter();

  toggleProfile() {
    this.hide.emit();
  }

}
