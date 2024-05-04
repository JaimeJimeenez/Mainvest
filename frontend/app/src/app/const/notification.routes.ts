import { Route } from "../core/interfaces/common";

export const NOTIFICATION_ROUTES: Route[] = [
  {
    path: '/dashboard/notification/assets',
    label: 'Precios',
    icon: 'attach_money'
  },
  {
    path: '/dashboard/notification/likes',
    label: 'Me gusta',
    icon: 'favorite'
  },
  {
    path: '/dashboard/notification/posts',
    label: 'Comentarios',
    icon: 'forum'
  },
];
