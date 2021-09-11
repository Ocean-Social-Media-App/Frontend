import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  signUpLabel: string = "Sign Up";
  signInLabel: string = "Sign In";

  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', {
      validators: [Validators.required, Validators.email]
    }],
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private userService: UserService) { }

  signUp(event: any) {
    if (this.signupForm.invalid) {
      return;
    }

    this.userService.register(this.signupForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Registration successful');
          console.log(data);
        },
        error => {
          console.log('Registration failed');
          console.log(error);
        }
      );
  }

}
