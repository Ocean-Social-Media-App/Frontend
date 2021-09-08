import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  signUpLabel: string = "Sign Up";
  logInLabel: string = "Log In"
  testString1 : string = "You trying to Sign Up!";
  testString2 : string = "You trying to Login!";
  isSignUpBtn: boolean = true;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  /* example on calling function in parent component function can be called anything */
  logIn(event: any){
    console.log('login', event)
    alert(this.testString2)
  }

  signUp(event: any){
    console.log('login', event)
    alert(this.testString1)
  }

}
