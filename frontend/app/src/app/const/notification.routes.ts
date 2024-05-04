import { Route } from "../core/interfaces/common";

export const NOTIFICATION_ROUTES: Route[] = [
  {
    path: '/dashboard/notification/prices',
    label: 'Precios',
    icon: 'attach_money'
  },
  {
    path: '/dashboard/notification/likes',
    label: 'Me gusta',
    icon: 'favorite'
  },
  {
    path: '/dashboard/notification/replies',
    label: 'Comentarios',
    icon: 'forum'
  },
];
