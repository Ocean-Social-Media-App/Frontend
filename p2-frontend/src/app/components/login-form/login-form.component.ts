import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  [x: string]: any;

  @Output() toggle: EventEmitter<any> = new EventEmitter();
  signUpLabel: string = "Sign Up";
  logInLabel: string = "Log In"
  testString1 : string = "You trying to Sign Up!";
  testString2 : string = "You trying to Login!";
  isSignUpBtn: boolean = true;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private router: Router) { }

  /* example on calling function in parent component function can be called anything */
  logIn(event: any){
    console.log('login', event)
    /* alert(this.testString2) */

    /* this.router.navigateByUrl('/userFeed'); */

  }

  signUp(event: any){
    console.log('signup', event)
    alert(this.testString1)
  }

  toggleForm(): void {
    this.toggle.emit("signup");
  }

}


