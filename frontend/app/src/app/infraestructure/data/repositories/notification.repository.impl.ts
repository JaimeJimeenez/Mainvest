import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Post } from "src/app/core/interfaces/board";
import { Notification } from "src/app/core/interfaces/social";
import { NotificationRepository } from "src/app/core/repositories/notification.repository";
import { NotificationService } from "src/app/core/services/notification.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationRepositoryImpl extends NotificationRepository {

  constructor(private notification: NotificationService) {
    super();
  }

  override getLikedPosts$(idUser: number): Observable<Post[]> {
    try {
      return this.notification.getLikedPosts$(idUser);
    } catch (error) {
      throw error;
    }
  }

  override addNotification$(idUser: number, idPost: number, isLiked: boolean): Observable<boolean> {
    try {
      const notification: Notification = { idUser, idPost, isLiked };
      return this.notification.addNotification$(notification);
    } catch (error) {
      throw error;
    }
  }

  override deleteNotification$(idUser: number, idPost: number, isLiked: boolean): Observable<boolean> {
    try {
      return this.notification.deleteNotification$(idUser, idPost, isLiked);
    } catch (error) {
      throw error;
    }
  }
}
