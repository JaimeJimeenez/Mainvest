import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { UserSocial } from 'src/app/core/interfaces/social';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { SocialRepositoryImpl } from 'src/app/infraestructure/data/repositories/social.repository.impl';
import { SocialUserComponent } from 'src/app/shared/components/social-user/social-user.component';
import { SocialNavComponent } from '../social-nav/social-nav.component';

@Component({
  selector: 'mainvest-profile-followers',
  standalone: true,
  imports: [CommonModule, SocialNavComponent, SocialUserComponent],
  templateUrl: './social-followers.component.html',
  styleUrls: ['./social-followers.component.scss']
})
export class SocialFollowersComponent {
  public followers: UserSocial[] = [];
  public _userId: number = 0;;

  constructor(
    private route: ActivatedRoute,
    private userIdObservable: UserIdObservableService,
    private socialRepository: SocialRepositoryImpl
  ) {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      try {
        const id: string | null = params.get('id');
        if (id !== null) {
          this._userId = +id;
          this.userIdObservable.sendUserId(this._userId);
          this.followers = await lastValueFrom(this.socialRepository.getUserFollowers$(this._userId));
          console.log(this.followers);
          this._updateIsFollowingProperty();
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  private async _updateIsFollowingProperty(): Promise<void> {
    try {
      const followings: UserSocial[] = await lastValueFrom(this.socialRepository.getUserFollowings$(this._userId));
      followings.forEach((user: UserSocial) => {
        const index = this.followers.findIndex((follower: UserSocial) => follower.id === user.id);
        if (index !== -1) {
          this.followers[index].isFollowing = true;
        }
      });
    } catch (error) {
      console.error(error);
    }

  }

}
