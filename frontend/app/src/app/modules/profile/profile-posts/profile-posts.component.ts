import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostComponent } from 'src/app/shared/components/post/post.component';
import { Post } from 'src/app/core/interfaces/board';
import { lastValueFrom } from 'rxjs';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';

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
    this.posts = await lastValueFrom(this.boardRepository.getUsersPosts$(this._userId));
    console.log(this.posts);
  }
}
