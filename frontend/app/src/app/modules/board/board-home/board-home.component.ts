import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { lastValueFrom } from 'rxjs';

import { Post } from 'src/app/core/interfaces/board';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';
import { ModalNewPostComponent } from 'src/app/shared/components/modals/modal-new-post/modal-new-post.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { User } from 'src/app/core/interfaces/user';
import { LocalStorage } from 'src/app/core/libs/local.storage';

@Component({
  selector: 'mainvest-board-home',
  standalone: true,
  imports: [CommonModule, PostComponent, ModalNewPostComponent],
  templateUrl: './board-home.component.html',
  styleUrls: ['./board-home.component.scss']
})
export class BoardHomeComponent {
  public posts: Post[] = [];

  constructor(private boardRepository: BoardRepositoryImpl) {}

  async ngOnInit() {
    this.posts = await lastValueFrom(this.boardRepository.getRandomPosts$());
    const user: User | undefined = LocalStorage.getUser();
    if (user !== undefined) {
      const likedPosts: number[] = await lastValueFrom(this.boardRepository.getLikedPosts$(user.id));
      this.posts.forEach((post: Post) => {
        const index = likedPosts.findIndex((liked: number) => post.id === liked);
        if (index !== -1) post.isLiked = true;
      })
    }
  }
}
