import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user';
import { LocalStorage } from 'src/app/core/libs/local.storage';
import { lastValueFrom } from 'rxjs';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';
import { PostIdObservableService } from 'src/app/core/services/observables/post-id-observable.service';
import { NotificationRepositoryImpl } from 'src/app/infraestructure/data/repositories/notification.repository.impl';

@Component({
  selector: 'mainvest-modal-reply',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-reply.component.html',
  styleUrls: ['./modal-reply.component.scss']
})
export class ModalReplyComponent {
  private _idPost: number = 0;
  public replyForm: FormGroup;

  constructor(
    private boardRepository: BoardRepositoryImpl,
    private notificationRepository: NotificationRepositoryImpl,
    private postIdObservable: PostIdObservableService
  ) {
    this.replyForm = new FormGroup({
      content: new FormControl('', [Validators.required])
    });

    this.postIdObservable.postId$.subscribe((id: number) => this._idPost = id)
  }

  async onSubmit(): Promise<void> {
    const { content } = this.replyForm.value;

    try {
      const user: User | undefined = LocalStorage.getUser();
      if (user !== undefined) {
        const id = user.id;
        const data: any[] = await lastValueFrom(this.boardRepository.reply$(this._idPost, +id, content));
        debugger;
        await lastValueFrom(this.notificationRepository.addNotification$(+id, data[0].id, false));
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
