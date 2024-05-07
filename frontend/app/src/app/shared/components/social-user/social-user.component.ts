import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSocial } from 'src/app/core/interfaces/social';
import { Router } from '@angular/router';
import { SocialRepositoryImpl } from 'src/app/infraestructure/data/repositories/social.repository.impl';
import { User } from 'src/app/core/interfaces/user';
import { LocalStorage } from 'src/app/core/libs/local.storage';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'mainvest-social-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-user.component.html',
  styleUrls: ['./social-user.component.scss']
})
export class SocialUserComponent {
  private _userId: number = 0;
  @Input() user: UserSocial = {
    id: 0,
    username: '',
    isFollowing: false
  }

  constructor(private route: Router, private socialRepository: SocialRepositoryImpl) {
    const user: User | undefined = LocalStorage.getUser();
    if (user !== undefined) {
      this._userId = user.id;
    }
  }

  onShowProfile(): void {
    this.route.navigate([`/dashboard/social/home/${this.user.id}`]);
  }

  async onFollowOptions(follow: boolean): Promise<void> {
    this.user.isFollowing = follow;
    if (follow) {
      await lastValueFrom (this.socialRepository.followUser$(this.user.id, this._userId));
    } else {
      await lastValueFrom(this.socialRepository.unfollowUser$(this._userId, this.user.id));
    }
  }
}
