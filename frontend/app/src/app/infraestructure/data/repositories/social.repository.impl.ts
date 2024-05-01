import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

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
}
