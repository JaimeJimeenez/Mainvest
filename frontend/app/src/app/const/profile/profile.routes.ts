import { Route } from "../../core/interfaces/common";

export const PROFILE_ROUTES: Route[] = [
  {
    path: '/dashboard/social/home',
    label: '',
    icon: 'account_circle'
  },
  {
    path: '/dashboard/profile/posts',
    label: 'Publicaciones',
    icon: 'post'
  },
  {
    path: '/dashboard/profile/likes',
    label: 'Me gusta',
    icon: 'favorite'
  },
  {
    path: '/dashboard/profile/wallets/list',
    label: 'Carteras',
    icon: 'wallet'
  }
];
