import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isConnected = new BehaviorSubject(false);

  readonly tokenKey = 'access_token';
  tokenValue: string | null = null;

  constructor() {
    this.tokenValue = localStorage.getItem(this.tokenKey);
    this.isConnected.next(!!this.getToken());
  }

  connect(token: string) {

    this.isConnected.next(true);
    this.tokenValue = token;
    localStorage.setItem(this.tokenKey, this.tokenValue);
  }

  disconnect() {
    this.isConnected.next(false);
    this.tokenValue = null;
    localStorage.removeItem(this.tokenKey);

  }

  getToken() {
    return this.tokenValue;

  }

}
