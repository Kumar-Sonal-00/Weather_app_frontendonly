import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('isLoggedIn'); // Check if user is logged in

  if (isLoggedIn) {
    return true; // Allow access to the route
  } else {
    alert('You must be logged in');
    router.navigate(['/login']); 
    return false; 
  }
};
