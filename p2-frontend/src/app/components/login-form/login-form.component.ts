import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';

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
  user : User|undefined;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

 /*  @Input() */
  aUser: User = {
    userId: 0,
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    aboutMe: "",
    bday: undefined,
    pro_pic_url: ""
  }

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  /* example on calling function in parent component function can be called anything */
  logIn(event: any){
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Login successful");
          console.log(data);
          this.router.navigateByUrl('userFeed');
        },
        error => {
          console.log('Login failed');
          console.log(error);
        }
      )

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


