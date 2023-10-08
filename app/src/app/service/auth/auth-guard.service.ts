import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuardGuard : CanActivateFn = (route, estate) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token)
    router.navigate(['/auth/login']);

  return true;
}
