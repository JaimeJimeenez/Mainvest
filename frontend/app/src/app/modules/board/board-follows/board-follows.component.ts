import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SocialRepositoryImpl } from 'src/app/infraestructure/data/repositories/social.repository.impl';
import { ModalNewPostComponent } from 'src/app/shared/components/modals/modal-new-post/modal-new-post.component';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';
import { Post } from 'src/app/core/interfaces/board';
import { PostComponent } from 'src/app/shared/components/post/post.component';

@Component({
  selector: 'mainvest-board-follows',
  standalone: true,
  imports: [CommonModule, ModalNewPostComponent, PostComponent],
  templateUrl: './board-follows.component.html',
  styleUrls: ['./board-follows.component.scss']
})
export class BoardFollowsComponent {
  private _userId: number = 0;

  public posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private socialRepository: SocialRepositoryImpl,
    private userIdObservable: UserIdObservableService,
    private boardRepository: BoardRepositoryImpl
  ) {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const id: string | null = params.get('id');
      if (id !== null) {
        this._userId = +id;
        this.userIdObservable.sendUserId(this._userId);
      }
      const ids: number[] = await lastValueFrom(this.socialRepository.getFollowings$(this._userId));
      console.log(ids);
      this.posts = await lastValueFrom(this.boardRepository.getFollowingPosts$(ids));
    });
  }
}
