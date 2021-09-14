import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  current: string = 'login';

  /* label for button this is the var that goes in quotation in html */
/*   label: string = "button label";
  testString : string = "you pushed the button!" */

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('userId') != null) {
      this.router.navigateByUrl('userFeed');
    }
  }

  /* example on calling function in parent component function can be called anything */
  /* functionCall(event: any){
    console.log('functionCall', event)
    alert(this.testString)
  } */

  toggle(data: string) {
    this.current = data;
  }

}
