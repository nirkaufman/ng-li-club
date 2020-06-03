import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  private _authService: AuthService;
  private _router: Router;

  constructor(authService: AuthService, router: Router) {
    this._authService = authService;
    this._router = router;
  }

  canActivate(): Observable<boolean> {
    return this.isLoggedIn();
  }

  canLoad(): Observable<boolean> {
    return this.isLoggedIn();
  }

  private isLoggedIn(): Observable<boolean> {
    return this._authService.currentUser$.pipe(
        take(1),
        map( user => !!user ),
        tap( async (isUserLoggedIn) => {
          if(!isUserLoggedIn) {
            await this._router.navigate(['/'])
          }
        } )
    )
  }

}
