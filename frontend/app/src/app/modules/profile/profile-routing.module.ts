import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileLikesComponent } from './profile-likes/profile-likes.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileMainComponent,
    children: [
      {
        path: 'settings/:id',
        component: ProfileSettingsComponent
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
          import('../wallet/wallets.module').then(
            (module) => module.WalletsModule
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
