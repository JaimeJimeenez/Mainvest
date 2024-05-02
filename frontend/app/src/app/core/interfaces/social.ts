export interface UserSocial {
  id: number;
  username: string;
  isFollowing: boolean;
}

export interface NewFollower {
  idFollowing: number;
  idFollower: number;
}
