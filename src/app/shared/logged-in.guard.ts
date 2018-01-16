import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import {UserService} from './user.service';

@Injectable()
export class LoggedInGuardGuard implements CanActivate {
  constructor(private _userService: UserService,
              private _router: Router,
              private _location: Location) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._userService.isLoggedin) {
      return true;
    } else {
      this._router.navigate([this._location.path()]);   // aktuális elérés elkérése
      // this._router.navigate(['/home']);
      return false;
    }
  }
}
