import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Post } from 'src/app/core/interfaces/board';
import { lastValueFrom } from 'rxjs';
import { NotificationRepositoryImpl } from 'src/app/infraestructure/data/repositories/notification.repository.impl';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';

@Component({
  selector: 'mainvest-notification-likes',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './notification-likes.component.html',
  styleUrls: ['./notification-likes.component.scss']
})
export class NotificationLikesComponent {
  private _userId: number = 0;

  public posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private userIdObservable: UserIdObservableService,
    private notificationRepository: NotificationRepositoryImpl,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id: string | null = params.get('id');
      if (id !== null) {
        this._userId = +id;
        this.userIdObservable.sendUserId(+id);
        this._getLikedPosts();
      }
    });
  }

  private async _getLikedPosts(): Promise<void> {
    try {
      this.posts = await lastValueFrom(this.notificationRepository.getLikedPosts$(this._userId));
      this.posts.forEach((post: Post) => {
        if (post.id_user === this._userId)
          post.isLiked = true;
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async onEraseNotification(index: number): Promise<void> {
    try {
      const post: Post = this.posts[index];
      await lastValueFrom(this.notificationRepository.deleteNotification$(this._userId, post.id, true));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  onShowPost(id: number): void {
    this.router.navigate(['/dashboard/board/post/' + id]);
  }
}
