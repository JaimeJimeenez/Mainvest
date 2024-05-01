import { Observable } from "rxjs";

export abstract class SocialRepository {
  abstract getFollowings$(idUser: number): Observable<number[]>;
}
