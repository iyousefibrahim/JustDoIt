import { CanActivateFn } from '@angular/router';

export const hasapikeyGuard: CanActivateFn = (route, state) => {
  return true;
};
