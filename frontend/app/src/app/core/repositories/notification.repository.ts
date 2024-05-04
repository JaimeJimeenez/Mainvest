import { Observable } from "rxjs";
import { Post } from "../interfaces/board";

export abstract class NotificationRepository {
  abstract addNotification$(idUser: number, idPost: number, isLiked: boolean): Observable<boolean>;
  abstract getLikedPosts$(idUser: number): Observable<Post[]>;
  abstract getRepliesPosts$(idUser: number): Observable<Post[]>;
  abstract deleteNotification$(idUser: number, idPost: number, isLiked: boolean): Observable<boolean>;
}
