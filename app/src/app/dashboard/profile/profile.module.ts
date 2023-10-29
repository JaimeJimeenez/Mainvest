import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './header/info/info.component';
import { SubmenuComponent } from 'src/app/components/submenu/submenu.component';
import { CardMoneyComponent } from 'src/app/components/card-money/card-money.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from 'src/app/auth/auth.module';
import { WalletsComponent } from './wallets/wallets.component';
import { SharedWalletsComponent } from './shared-wallets/shared-wallets.component';
import { LikedPostsComponent } from './liked-posts/liked-posts.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AuthModule,
    SubmenuComponent,
    ReactiveFormsModule,
    CardMoneyComponent,
    ProfileRoutingModule
  ],
  exports: [],
  declarations: [ ProfileComponent, ProfileInfoComponent, SettingsComponent, HeaderComponent, WalletsComponent, SharedWalletsComponent, LikedPostsComponent, PostsComponent ],
})
export class ProfileModule { }
