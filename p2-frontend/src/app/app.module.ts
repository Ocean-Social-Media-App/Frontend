import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { NewPostFormComponent } from './components/new-post-form/new-post-form.component';
import { NewCommentFormComponent } from './components/new-comment-form/new-comment-form.component';

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
    NewPostFormComponent,
    NewCommentFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
