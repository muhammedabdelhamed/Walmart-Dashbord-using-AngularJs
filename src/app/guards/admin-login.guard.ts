import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminLoginGuard: CanActivateFn = (route, state) => {
  var adminAuth = inject(AdminAuthService)
  var router = inject(Router)

  if (!adminAuth.isUserLogged){
    return true
  } else {
    router.navigate(['/'])
    return false
  }
};
