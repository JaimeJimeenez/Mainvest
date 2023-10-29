import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PostsComponent } from './posts/posts.component';
import { SharedWalletsComponent } from './shared-wallets/shared-wallets.component';
import { LikedPostsComponent } from './liked-posts/liked-posts.component';
import { WalletsComponent } from './wallets/wallets.component';

const routes : Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'shared',
        component: SharedWalletsComponent,
      },
      {
        path: 'liked',
        component: LikedPostsComponent,
      },
      {
        path: 'wallets',
        component: WalletsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
