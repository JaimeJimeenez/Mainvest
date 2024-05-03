import { Observable } from "rxjs";
import { UserSocial } from "../interfaces/social";

export abstract class SocialRepository {
  abstract getFollowings$(idUser: number): Observable<number[]>;
  abstract getUserFollowings$(idUser: number): Observable<UserSocial[]>;
  abstract followUser$(idFollowing: number, idFollower: number): Observable<boolean>;
  abstract getUserFollowers$(idUser: number): Observable<UserSocial[]>;
  abstract unfollowUser$(idFollowing: number, idFollower: number): Observable<boolean>;
}
