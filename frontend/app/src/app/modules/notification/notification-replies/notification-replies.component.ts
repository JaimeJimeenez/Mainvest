import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Post } from 'src/app/core/interfaces/board';
import { NotificationRepositoryImpl } from 'src/app/infraestructure/data/repositories/notification.repository.impl';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { PostComponent } from 'src/app/shared/components/post/post.component';

@Component({
  selector: 'mainvest-notification-replies',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './notification-replies.component.html',
  styleUrls: ['./notification-replies.component.scss']
})
export class NotificationRepliesComponent {
  private _userId: number = 0;

  public posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private userIdObservable: UserIdObservableService,
    private notificationRepository: NotificationRepositoryImpl
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id: string | null = params.get('id');
      if (id !== null) {
        this._userId = +id;
        this.userIdObservable.sendUserId(+id);
        this._getRepliesPosts();
      }
    });
  }

  private async _getRepliesPosts(): Promise<void> {
    try {
      this.posts = await lastValueFrom(this.notificationRepository.getRepliesPosts$(this._userId));
      this.posts.forEach((post: Post) => post.isReply = true);
    } catch (error) {
      console.error(error);
    }
  }

  public async onEraseNotification(index: number): Promise<void> {
    try {
      const post: Post = this.posts[index];
      await lastValueFrom(this.notificationRepository.deleteNotification$(this._userId, post.id, false));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}
