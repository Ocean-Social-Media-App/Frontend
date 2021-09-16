import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ProfileCreateComponent } from './pages/profile-create/profile-create.component';
import { UserFeedComponent } from './pages/user-feed/user-feed.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { ProfileFeedComponent } from './pages/profile-feed/profile-feed.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'createProfile', component: ProfileCreateComponent},
  {path: 'userFeed', component: UserFeedComponent, runGuardsAndResolvers: 'always'},
  {path: 'testPage', component: TestPageComponent},
  {path: 'profile-feed/:id', component: ProfileFeedComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
