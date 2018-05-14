import { Component } from '@angular/core';

@Component({
  selector: 'plateauxapp-admin',
  template: `
    <mat-card>
      <h1>Administration</h1>
      <nav></nav>
      <router-outlet></router-outlet>
    </mat-card>
  `,
  styles: [`ul>li { display: inline; }`]
})
export class AdminComponent {}
