import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  /* label for button this is the var that goes in quotation in html */
  label: string = "button label";
  testString : string = "you pushed the button!"
  
  constructor() { }

  ngOnInit(): void {
  }

  /* example on calling function in parent component function can be called anything */
  functionCall(event: any){
    console.log('functionCall', event)
    alert(this.testString)
  }

}
