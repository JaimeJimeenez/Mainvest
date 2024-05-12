import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { Post } from 'src/app/core/interfaces/board';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';
import { PostComponent } from 'src/app/shared/components/post/post.component';

@Component({
  selector: 'mainvest-board-post',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './board-post.component.html',
  styleUrls: ['./board-post.component.scss']
})
export class BoardPostComponent {
  public post: Post = {
    id: 0,
    username: '',
    content: '',
    likes: 0,
    replies: 0,
    created_at: '',
    id_user: 0,
    isLiked: false
  }
  public responses: Post[] = [];

  private _id: number = 0;

  constructor(private route: ActivatedRoute, private boardRepository: BoardRepositoryImpl) {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const id: string | null = params.get('id');
      if (id !== null) {
        this._id = +id;
        this._getPost();
        this._getResponses();
      }
    });
  }

  private async _getPost(): Promise<void> {
    try {
      const data: any= await lastValueFrom(this.boardRepository.getPost$(this._id));
      this.post = data[0]
    } catch (error) {
      console.error(error);
    }
  }

  private async _getResponses(): Promise<void> {
    try {
      this.responses = await lastValueFrom(this.boardRepository.getResponses$(this._id));
      this.responses.forEach((response: Post) => response.isReply = true);
    } catch (error) {
      console.error(error);
    }
  }
}
