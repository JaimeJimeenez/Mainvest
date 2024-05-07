export interface PostDTO {
  id: number;
  username: string;
  content: string;
  likes: number;
  replies: number;
  created_at: string;
  id_user: number;
  isLiked: boolean;
}
