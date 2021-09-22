import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  current: string = 'login';

  forgotForm = this.fb.group({
    username: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('userId') != null) {
      this.router.navigateByUrl('userFeed');
    }
  }

  sendPasswordEmail(event: any) {
    if (this.forgotForm.invalid) {
      console.log("invalid form");
      return;
    }

    console.log(this.forgotForm.get('username').value);

    this.userService.forgotPassword(this.forgotForm.get('username').value)
      .subscribe(
        data => {
          console.log("Forgot email password sent");
          console.log(data);
          alert('A new password has been sent to your email');
          this.current = 'login';
        },
        error => {
          console.log("error sending password reset");
        }
      );
    }

  toggle(data: string) {
    this.current = data;
  }

  backToLogin() {
    this.current = 'login';
  }

}
