import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noApiKeyGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('apiKey') === null) {
    return false;
  }
  else {
    _Router.navigate(["/todos"]);
    return true;
  }
};
