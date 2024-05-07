import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialMainComponent } from './social-main/social-main.component';
import { SocialHomeComponent } from './social-home/social-home.component';
import { SocialFollowersComponent } from './social-followers/social-followers.component';

const routes: Routes = [
  {
    path: '',
    component: SocialMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home/:id',
        pathMatch: 'full'
      },
      {
        path: 'home/:id',
        component: SocialHomeComponent
      },
      {
        path: 'followers/:id',
        component: SocialFollowersComponent
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SocialRoutingModule { }
