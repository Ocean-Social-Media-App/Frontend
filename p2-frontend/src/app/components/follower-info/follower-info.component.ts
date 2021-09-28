import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscriber } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-follower-info',
  templateUrl: './follower-info.component.html',
  styleUrls: ['./follower-info.component.css']
})

export class FollowerInfoComponent implements OnInit {

  userIdFromParam: number = this.route.snapshot.params["id"];
  followLabel : string = "Follow";
  followed: boolean = false;
  followers: number = 0;
  following: number = 0;
  allFollowing: Subscriber<any> = new Subscriber;
  userInSession:number;
  closeResult = '';

  constructor(private userService: UserService, private route: ActivatedRoute, private modalService: NgbModal, private router:Router) { }

  ngOnInit(): void {
    this.userInSession = JSON.parse(sessionStorage.getItem('userObj')).userId;
    this.userService.getAllFollowing(this.userInSession).subscribe(following => {
      console.log(following);
      this.following = following.data.length;
    })
    this.userService.getAllFollowers().subscribe(follower => {
      if(follower == null){
        this.followers = 1;
      }else{
      console.log(follower);
      this.followers = follower.data.length;
      }
    })
  }

  follow(){
    this.followed = !this.followed;
    if(this.followed)
    {
      this.followLabel = "Unfollow"
     this.userService.followUser(this.userIdFromParam, this.userInSession).subscribe(response => console.log(response))
     this.following = +this.following +  1;
    }
    else{
      this.followLabel = "Follow"
      this.userService.unfollowUser(this.userIdFromParam, this.userInSession).subscribe(response=>console.log(response))
      this.following = +this.following - 1;
    }
  }

  open(content: any) {
    
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openFollowingPage(){
    this.router.navigateByUrl(`/following/${this.userIdFromParam}`)
  }

}
