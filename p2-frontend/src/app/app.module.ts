import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { FeedComponent } from './components/feed/feed.component';
import { NewPostFormComponent } from './components/new-post-form/new-post-form.component';
import { NewCommentFormComponent } from './components/new-comment-form/new-comment-form.component';
import { ProfilePicSmComponent } from './components/profile-pic-sm/profile-pic-sm.component';
import { NewProfileFormComponent } from './components/new-profile-form/new-profile-form.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { PostComponent } from './components/post/post.component';
import { UpdatePostFormComponent } from './components/update-profile-form/update-profile-form.component';

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
    NewProfileFormComponent,
    TestPageComponent,
    ProfilePicSmComponent,
    PostComponent,
    UpdatePostFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
