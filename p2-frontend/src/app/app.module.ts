import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { ProfileCreateComponent } from './pages/profile-create/profile-create.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { UserFeedComponent } from './pages/user-feed/user-feed.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedComponent } from './components/feed/feed.component';
import { NewPostFormComponent } from './components/new-post-form/new-post-form.component';
import { NewCommentFormComponent } from './components/new-comment-form/new-comment-form.component';
import { ProfilePicSmComponent } from './components/profile-pic-sm/profile-pic-sm.component';
import { NewProfileFormComponent } from './components/new-profile-form/new-profile-form.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { PostComponent } from './components/post/post.component';
import { UpdatePostFormComponent } from './components/update-profile-form/update-profile-form.component';
import { ProfileFeedComponent } from './pages/profile-feed/profile-feed.component';
import { FeedByUserComponent } from './components/feed-by-user/feed-by-user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentThreadComponent } from './components/comment-thread/comment-thread.component';
import { UserLinkComponent } from './components/user-link/user-link.component';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SearchComponent } from './components/search/search.component';
import { ForgotEmailComponent } from './components/forgot-email/forgot-email.component';
import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProfileCreateComponent,
    ButtonsComponent,
    LoginFormComponent,
    ViewProfileComponent,
    ProfilePicComponent,
    UserFeedComponent,
    SignupFormComponent,
    NavBarComponent,
    FeedComponent,
    NewPostFormComponent,
    NewCommentFormComponent,
    ProfilePicSmComponent,
    PostComponent,
    UpdatePostFormComponent,
    PostComponent,
    NewProfileFormComponent,
    TestPageComponent,
    ProfileFeedComponent,
    FeedByUserComponent,
    UserInfoComponent,
    CommentComponent,
    CommentThreadComponent,
    UserLinkComponent,
    ControlMessagesComponent,
    SearchComponent,
    ForgotEmailComponent,
    PasswordResetFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
