import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const canLoginGuard: CanActivateFn = (route, state) => {
 let accountservice= inject(AccountService);
 if (accountservice.isLogged)
   return true;
 let router=inject(Router);
 router.navigateByUrl("/login")
  return false;

};
