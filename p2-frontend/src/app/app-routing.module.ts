import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ProfileCreateComponent } from './pages/profile-create/profile-create.component';
import { UserFeedComponent } from './pages/user-feed/user-feed.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'createProfile', component: ProfileCreateComponent},
  {path: 'userFeed', component: UserFeedComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
