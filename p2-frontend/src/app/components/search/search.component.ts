import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, DoCheck{

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

  searchInput:string= "";
  userList: Array<any> = []; 
  listTemp: Array<User> = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if(this.searchInput != "" ){
      this.listTemp = this.userList.filter(user => user.username.startsWith(this.searchInput))
      console.log(this.listTemp)
    }
    
  }

}
