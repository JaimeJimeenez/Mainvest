import { Route } from "../core/interfaces/common";

export const profileRoutes: Route[] = [
  {
    path: '/dashboard/profile/main',
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
    path: '/dashboard/profile/wallets',
    label: 'Carteras',
    icon: 'wallet'
  }
];
