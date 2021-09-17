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

  signUpLabel: string = "Sign Up";
  logInLabel: string = "Log In"
  isValid: boolean|null = null;

  // variables to be set from session storage
  userObj: any = {};

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  /* example on calling function in parent component function can be called anything */
  logIn(event: any){
    if (this.loginForm.invalid) {
      let username =  this.loginForm.get('username');
      username!.hasError('required') && username!.touched ? this.isValid = false : this.isValid = true;
      console.log(this.isValid);

      return;
    }

    this.userService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Login successful");
          console.log(data);

          let user = data.data;
          console.log(user);

          sessionStorage.setItem('userObj', JSON.stringify(user));

          this.router.navigateByUrl('userFeed');
        },
        error => {
          console.log('Login failed');
          console.log(error);
        }
      )
  }

  @Output() toggle: EventEmitter<any> = new EventEmitter();
  toggleForm(): void {
    this.toggle.emit("signup");
  }

}


