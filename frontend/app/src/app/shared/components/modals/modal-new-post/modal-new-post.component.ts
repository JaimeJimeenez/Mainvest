import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorage } from 'src/app/core/libs/local.storage';
import { User } from 'src/app/core/interfaces/user';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'mainvest-modal-new-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-new-post.component.html',
  styleUrls: ['./modal-new-post.component.scss']
})
export class ModalNewPostComponent {
  public postForm: FormGroup;

  constructor(private boardRepository: BoardRepositoryImpl) {
    this.postForm = new FormGroup({
      content: new FormControl('', [Validators.required])
    });
  }

  async onSubmit(): Promise<void> {
    const { content } = this.postForm.value;
    try {
      const user: User | undefined = LocalStorage.getUser();
      if (user !== undefined) {
        const id = user.id;
        await lastValueFrom(this.boardRepository.newPost$(+id, content));
        window.location.reload();
      }
    } catch (error: any) {
      console.error(error);
    }
  }
}
