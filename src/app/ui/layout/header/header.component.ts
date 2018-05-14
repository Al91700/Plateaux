import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'plateauxapp-header',
  template: `
    <header id="header">
      <div id="logo">
        <img src="assets/logo.svg" alt="Plateaux" width="60" height="60">
      </div>
      <plateauxapp-menu [isConnected]="isConnected"></plateauxapp-menu>
    </header>
  `,
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input() isConnected = true;

}
