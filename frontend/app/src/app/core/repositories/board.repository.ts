import { Observable } from "rxjs";
import { Post } from "../interfaces/board";

export abstract class BoardRepository {
  abstract getRandomPosts$(): Observable<Post[]>;
  abstract newPost$(idUser: number, content: string): Observable<boolean>;
  abstract reply$(idPost: number, idUser: number, content: string): Observable<boolean>;
  abstract addLike$(idUser: number, idPost: number): Observable<boolean>;
  abstract getLikedPosts$(idUser: number): Observable<number[]>;
  abstract updateLike$(idUser: number, idPost: number, updateLike: number): Observable<boolean>;
  abstract deleteLike$(idUser: number, idPost: number): Observable<boolean>;
  abstract getFollowingPosts$(ids: number[]): Observable<Post[]>;
}
