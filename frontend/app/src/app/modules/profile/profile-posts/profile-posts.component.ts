import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostComponent } from 'src/app/shared/components/post/post.component';
import { Post } from 'src/app/core/interfaces/board';
import { lastValueFrom } from 'rxjs';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { LocalStorage } from 'src/app/core/libs/local.storage';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'mainvest-profile-posts',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss']
})
export class ProfilePostsComponent {

  private _userId: number = 0;

  public posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private boardRepository: BoardRepositoryImpl,
    private userIdObservable: UserIdObservableService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id: string | null = params.get('id');
      if (id !== null) {
        this._userId = +id;
        this.userIdObservable.sendUserId(this._userId);
        this._getUsersPosts();
      }
    });
  }

  private async _getUsersPosts(): Promise<void> {
    this.posts = await lastValueFrom(this.boardRepository.getUsersLikesPosts$(this._userId));
    const user : User | undefined = LocalStorage.getUser();
    if (user !== undefined) {
      const usersPost = await lastValueFrom(this.boardRepository.getUsersLikesPosts$(user.id))
      this.posts.forEach((post: Post) => {
        const findIndex = usersPost.findIndex((userPost: Post) => post.id === userPost.id);
        if (findIndex !== -1) {
          this.posts[findIndex].isLiked = true;
        }
      });
    }
  }
}
