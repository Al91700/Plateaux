import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Famille } from '../../shared/famille';

@Component({
  selector: 'plateauxapp-familles-list',
  template: `
    <div>
      <plateauxapp-familles-item *ngFor="let famille of familles" [famille]="famille"></plateauxapp-familles-item>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamillesListComponent {

  @Input() familles: Famille[];

}
