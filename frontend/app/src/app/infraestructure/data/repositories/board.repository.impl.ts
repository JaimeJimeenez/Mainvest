import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Like, NewPost, Post, Reply } from "src/app/core/interfaces/board";
import { BoardRepository } from "src/app/core/repositories/board.repository";
import { BoardService } from "src/app/core/services/board.service";

@Injectable({
  providedIn: 'root'
})
export class BoardRepositoryImpl extends BoardRepository {


  constructor(private board: BoardService) {
    super();
  }

  override getRandomPosts$(): Observable<Post[]> {
    try {
      return this.board.getRandomPosts$();
    } catch (error) {
      throw error;
    }
  }

  override newPost$(idUser: number, content: string): Observable<boolean> {
    try {
      const newPost: NewPost = { idUser, content}
      return this.board.newPost$(newPost);
    } catch (error) {
      throw error;
    }
  }

  override reply$(idPost: number, idUser: number, content: string): Observable<boolean> {
    try {
      const reply: Reply = { idPost, idUser, content };
      return this.board.reply$(reply);
    } catch (error) {
      throw error;
    }
  }

  override updateLike$(idUser: number, idPost: number, updateLike: number): Observable<boolean> {
    try {
      const like: Like = { idUser, idPost, updateLike };
      return this.board.updateLike$(like);
    } catch (error) {
      throw error;
    }
  }

  override addLike$(idUser: number, idPost: number): Observable<boolean> {
    try {
      const like: Like = { idUser, idPost };
      return this.board.addLike$(like);
    } catch (error) {
      throw error;
    }
  }

  override getLikedPosts$(id: number): Observable<number[]> {
    try {
      return this.board.getLikedPosts$(id);
    } catch (error) {
      throw error;
    }
  }

  override deleteLike$(idUser: number, idPost: number): Observable<boolean> {
    try {
      const like: Like = { idUser, idPost };
      return this.board.deleteLike$(like);
    } catch (error) {
      throw error;
    }
  }

  override getFollowingPosts$(ids: number[]): Observable<Post[]> {
    try {
      return this.board.getFollowingPosts$(ids);
    } catch (error) {
      throw error;
    }
  }
}
