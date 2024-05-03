import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { ProfileHomeNavComponent } from '../profile-home-nav/profile-home-nav.component';
import { UserSocial } from 'src/app/core/interfaces/social';
import { lastValueFrom } from 'rxjs';
import { SocialRepositoryImpl } from 'src/app/infraestructure/data/repositories/social.repository.impl';
import { SocialUserComponent } from 'src/app/shared/components/social-user/social-user.component';

@Component({
  selector: 'mainvest-profile-home',
  standalone: true,
  imports: [CommonModule, SocialUserComponent, ProfileHomeNavComponent],
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent {

  public followings: UserSocial[] = [];
  public userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userIdObservable: UserIdObservableService,
    private socialRepository: SocialRepositoryImpl
  ) {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const id: string | null = params.get('id');
      if (id !== null) {
        this.userId = +id;
        this.userIdObservable.sendUserId(+id);
        this.followings = await lastValueFrom(this.socialRepository.getUserFollowings$(+id));
        this.followings.forEach((user: UserSocial) => user.isFollowing = true);
      }
    });
  }
}