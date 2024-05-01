import { Route } from "../core/interfaces/common";

export const BOARD_ROUTES: Route[] = [
  {
    path: '/dashboard/board/home',
    label: 'Todos',
    icon: 'person_cancel'
  },
  {
    path: '/dashboard/board/follows',
    label: 'Siguiendo',
    icon: 'person_check'
  }
]