import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ProfileFollowersComponent } from './profile-followers/profile-followers.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileLikesComponent } from './profile-likes/profile-likes.component';

const routes : Routes = [
  {
    path: '',
    component: ProfileMainComponent,
    children: [
      {
        path: 'settings/:id',
        component: ProfileSettingsComponent
      },
      {
        path: 'home/:id',
        component: ProfileHomeComponent
      },
      {
        path: 'followers/:id',
        component: ProfileFollowersComponent
      },
      {
        path: 'posts/:id',
        component: ProfilePostsComponent
      },
      {
        path: 'likes/:id',
        component: ProfileLikesComponent
      },
      {
        path: 'wallets',
        loadChildren: () =>
          import('./profile-wallets/profile-wallets.module').then(
            (module) => module.ProfileWalletsModule
          )
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProfileRoutingModule { }
