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
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { FeedComponent } from './components/feed/feed.component';

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
    FeedComponent
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
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
