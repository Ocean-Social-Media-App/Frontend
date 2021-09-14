import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  updateLabel: string = "Update Profile"
  testString1 : string = "You trying to update this Profile!";
 
  userId: string|null = "";
  proPicUrl: string|null = "";
  
  constructor() { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId')
    this.proPicUrl = sessionStorage.getItem('proPicUrl')
    console.log(this.userId)
    console.log(this.proPicUrl)
  }

  updateProfile(event: any){
    console.log('updateProfile', event)
    alert(this.testString1)
  }

}
