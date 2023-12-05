import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PostsComponent } from './posts/posts.component';
import { SharedWalletsComponent } from './shared-wallets/shared-wallets.component';
import { LikedPostsComponent } from './liked-posts/liked-posts.component';
import { WalletsComponent } from './wallets/wallets.component';
import { WalletComponent } from './wallet/wallet.component';

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
      },
      {
        path: 'wallet/:id',
        component: WalletComponent
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
