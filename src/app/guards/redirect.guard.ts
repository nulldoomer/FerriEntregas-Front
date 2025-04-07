import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      router.navigate(['/admin/dashboard']);
      return false;
    }
  
  return true;
};
