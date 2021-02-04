import { UserAccountType } from './../Enums/Enums';
import { AccountService } from './../Services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const user = this.accountService.getUserAccount();
      if (null != user && user.isAuthenticated && user.accountType === UserAccountType.Administrator) {
        return true;
      } else {
        return false;
      }
  }

}
