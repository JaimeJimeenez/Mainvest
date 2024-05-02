import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { NewFollower, UserSocial } from "src/app/core/interfaces/social";

import { SocialRepository } from "src/app/core/repositories/social.repository";
import { SocialService } from "src/app/core/services/social.service";

@Injectable({
  providedIn: 'root'
})
export class SocialRepositoryImpl extends SocialRepository{

  constructor(private social: SocialService) {
    super();
  }

  override getFollowings$(idUser: number): Observable<number[]> {
    try {
      return this.social.getFollowings$(idUser);
    } catch (error) {
      throw error;
    }
  }

  override getUserFollowings$(idUser: number): Observable<UserSocial[]> {
    try {
      return this.social.getUserFollowings$(idUser);
    } catch (error) {
      throw error;
    }
  }

  override followUser$(idFollowing: number, idFollower: number): Observable<boolean> {
    try {
      const follower: NewFollower = { idFollowing, idFollower };
      return this.social.followUser$(follower);
    } catch (error) {
      throw error;
    }
  }
  override unfollowUser$(idFollowing: number, idFollower: number): Observable<boolean> {
    try {
      return this.social.unfollowUser$(idFollowing, idFollower);
    } catch (error) {
      throw error;
    }
  }

}
