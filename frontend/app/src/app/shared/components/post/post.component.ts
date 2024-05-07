import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Post } from 'src/app/core/interfaces/board';
import { PostDateFormatterPipe } from 'src/app/core/pipe/post-date-formatter.pipe';
import { ModalReplyComponent } from '../modals/modal-reply/modal-reply.component';
import { PostIdObservableService } from 'src/app/core/services/observables/post-id-observable.service';
import { lastValueFrom } from 'rxjs';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';
import { LocalStorage } from 'src/app/core/libs/local.storage';
import { User } from 'src/app/core/interfaces/user';
import { NotificationRepositoryImpl } from 'src/app/infraestructure/data/repositories/notification.repository.impl';

@Component({
  selector: 'mainvest-post',
  standalone: true,
  imports: [CommonModule, ModalReplyComponent, PostDateFormatterPipe],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post = {
    id: 0,
    username: '',
    content: '',
    likes: 0,
    replies: 0,
    id_user: 0,
    created_at: '',
    isLiked: false,
  }

  constructor(
    private boardRepository: BoardRepositoryImpl,
    private notificationRepository: NotificationRepositoryImpl,
    private postIdObservable: PostIdObservableService
  ) {}

  showPost(): void {
    this.postIdObservable.sendPostId(this.post.id);
  }

  async updateLike(isLiked: boolean): Promise<void> {
    try {
      this.post.likes = +this.post.likes
      const user: User | undefined = LocalStorage.getUser();
      const updateLike = isLiked ? 1 : -1;
      if (user !== undefined) {
        const id = user.id;
        await lastValueFrom(this.boardRepository.updateLike$(id, this.post.id, updateLike));
        if (isLiked) {
          await lastValueFrom(this.boardRepository.addLike$(id, this.post.id));
          await lastValueFrom(this.notificationRepository.addNotification$(id, this.post.id, true));
        } else {
          await lastValueFrom(this.boardRepository.deleteLike$(id, this.post.id));
          await lastValueFrom(this.notificationRepository.deleteNotification$(id, this.post.id, true));
        }
        this.post.likes += updateLike;
        this.post.isLiked = isLiked;
      }
    } catch (error) {
      throw error;
    }
  }
}
