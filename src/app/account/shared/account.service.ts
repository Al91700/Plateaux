import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, asyncScheduler } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AccountResponse } from './account-response';
import { AuthService } from '../../core/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(protected http: HttpClient, protected auth: AuthService) {}

  login(body: { email: string; password: string; }) {

    return this.http.post<AccountResponse>(`/api/account/login`, body).pipe(tap((response) => {
      if (response.token) {
        this.auth.connect(response.token);
      }
    }));

  }

  logout() {

    return of(true, asyncScheduler).pipe(tap(() => {
      this.auth.disconnect();
    }));

  }

  register(body: { email: string; password: string | { password1: string; password2: string; }; }) {

    return this.http.post<AccountResponse>(`/api/account/register`, body);

  }

  isAvailable(email: string) {

    return this.http.get<AccountResponse>(`/api/account/available/${email}`).pipe(map((response) => response.success));

  }

}
