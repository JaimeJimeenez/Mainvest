import { Route } from "src/app/core/interfaces/common";

export const PROFILE_WALLETS_ROUTES: Route[] = [
  {
    path: '/dashboard/profile/wallets/list',
    label: 'Mis carteras',
    icon: 'wallet'
  },
  {
    path: '/dashboard/profile/wallets/new',
    label: 'Nueva cartera',
    icon: 'add'
  }
]
