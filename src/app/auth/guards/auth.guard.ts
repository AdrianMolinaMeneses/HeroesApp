import { Injectable, Pipe } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // private checkAuthStatus(): boolean | Observable<boolean> {
  //   return this.authService.checkAuthentication().pipe(
  //     tap((isAuthenticated) => {
  //       if (!isAuthenticated) {
  //         this.router.navigate(['./auth/login']);
  //       }
  //     })
  //   );
  // }

  private checkAuthStatus(): boolean {
    if (!this.authService.checkAuthentication()) {
      this.router.navigate(['./auth/login']);
    }

    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
}
