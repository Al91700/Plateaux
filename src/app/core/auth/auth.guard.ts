import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(protected auth: AuthService) {}

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {

    return this.auth.isConnected.pipe(first());

  }

}
