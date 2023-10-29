import { IRoutes } from "../interface/main/iRoutes";

export const ROUTES : IRoutes[] = [
  {
    path : '/dashboard/market',
    label : 'Mercado',
  },
  {
    path : '/dashboard/board',
    label : 'Tablón',
  },
  {
    path : '/dashboard/wallets',
    label : 'Carteras',
  },
];

export const ROUTES_PROFILES : IRoutes[] = [
  {
    path: '/dashboard/profile/posts',
    label: 'Publicaciones',
    icon: 'fa-solid fa-comment',
  },
  {
    path: '/dashboard/profile/shared',
    label: 'Carteras compartidas',
    icon: 'fa-solid fa-wallet',
  },
  {
    path: '/dashboard/profile/liked',
    label: 'Me gusta',
    icon: 'fa-solid fa-heart',
  },
]
