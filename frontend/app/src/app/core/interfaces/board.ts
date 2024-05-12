export interface Post {
  id: number;
  username: string;
  content: string;
  likes: number;
  replies: number;
  created_at: string;
  id_user: number;
  isLiked: boolean;
  isReply?: boolean;
};

export interface NewPost {
  idUser: number;
  content: string;
};

export interface Reply {
  idPost: number;
  idUser: number;
  content: string;
}

export interface Like {
  idUser: number;
  idPost: number;
  updateLike?: number;
}
