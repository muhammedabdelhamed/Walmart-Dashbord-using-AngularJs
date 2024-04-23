import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRequestsService } from '../services/user-requests.service';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserRequestsService)
  var adminAuth = inject(AdminAuthService)
  const router = inject(Router)


  // if (userService.isUserLogged){
    if (adminAuth.isUserLogged){
    return true
  } else {
    router.navigate(['/login'])
    return false
  }
};
