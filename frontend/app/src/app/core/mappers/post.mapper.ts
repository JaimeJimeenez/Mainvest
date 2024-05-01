import { PostDTO } from "src/app/infraestructure/dto/board.dto";
import { Post } from "../interfaces/board";

export class PostMapper {
  public static fromAPIToDomain(postsDTO: PostDTO[]): Post[] {
    return postsDTO.map((post: PostDTO) => ({
      id: post.id,
      username: post.username,
      content: post.content,
      likes: post.likes,
      replies: post.replies,
      created_at: post.created_at,
      id_user: post.id_user,
      isLiked: post.isLiked
    }))
  }
}
