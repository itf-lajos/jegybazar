import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import {UserService} from './user.service';

@Injectable()
export class LoggedInGuardGuard implements CanActivate {
  constructor(private _userService: UserService,
//              private _location: Location,
              private _router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._userService.isLoggedIn$.map(
      isLoggedIn => {
        if (isLoggedIn === false) {
          this._router.navigate(['/home']);
          return false;
        }
        return true;
      }
    );

/*
    if (this._userService.isLoggedIn$) {
      return true;
    } else {
      this._router.navigate([this._location.path()]);   // aktuális elérés elkérése
      // this._router.navigate(['/home']);
      return false;
    }
*/

  }
}
