import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hasApiKeyGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('apiKey') === null) {
    return true;
  }
  else {
    _Router.navigate(["/todos"]);
    return false;
  }
};
