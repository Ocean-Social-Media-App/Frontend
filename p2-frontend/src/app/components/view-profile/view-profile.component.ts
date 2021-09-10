import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  updateLabel: string = "Update Profile"
  testString1 : string = "You trying to update this Profile!";
 
  constructor() { }

  ngOnInit(): void {
    //get data
  }

  updateProfile(event: any){
    console.log('updateProfile', event)
    alert(this.testString1)
  }

}
