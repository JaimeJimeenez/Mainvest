import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { ModalNewPostComponent } from 'src/app/shared/components/modals/modal-new-post/modal-new-post.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';

import { Post } from 'src/app/core/interfaces/board';

@Component({
  selector: 'mainvest-board-home',
  standalone: true,
  imports: [CommonModule, PostComponent, ModalNewPostComponent],
  templateUrl: './board-home.component.html',
  styleUrls: ['./board-home.component.scss']
})
export class BoardHomeComponent {
  private _userId: number = 0;
  public posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private boardRepository: BoardRepositoryImpl,
    private userIdObservable: UserIdObservableService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id !== null) {
        this._userId = +id;
        this.userIdObservable.sendUserId(this._userId);
      }
    });
  }

  async ngOnInit() {
    this.posts = await lastValueFrom(this.boardRepository.getRandomPosts$());
    const likedPosts: number[] = await lastValueFrom(this.boardRepository.getLikedPosts$(this._userId));
    this.posts.forEach((post: Post) => {
      const index = likedPosts.findIndex((liked: number) => post.id === liked);
      if (index !== -1) post.isLiked = true;
    });
  }
}
