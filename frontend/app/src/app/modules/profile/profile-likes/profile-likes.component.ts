import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Post } from 'src/app/core/interfaces/board';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';
import { PostComponent } from 'src/app/shared/components/post/post.component';

@Component({
  selector: 'mainvest-profile-likes',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './profile-likes.component.html',
  styleUrls: ['./profile-likes.component.scss']
})
export class ProfileLikesComponent {

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
        this._getUsersLikesPosts();
      }
    });
  }

  private async _getUsersLikesPosts(): Promise<void> {
    this.posts = await lastValueFrom(this.boardRepository.getUsersLikesPosts$(this._userId));
  }
}
