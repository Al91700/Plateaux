import { Component } from '@angular/core';
import { Network } from '@ngx-pwa/offline';
import { AuthService } from './core/auth';

/** @todo isConnected as async data */
@Component({
  selector: 'plateauxapp-root',
  template: `
    <div>
    <plateauxapp-header [isConnected]="isConnected$ | async"></plateauxapp-header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {

  isConnected$ = this.auth.isConnected;

  constructor(protected network: Network, protected auth: AuthService) {}

}
