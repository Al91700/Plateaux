import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Famille } from '../../shared/famille';

@Component({
  selector: 'plateauxapp-familles-item',
  template: `
    <article>
      <mat-card>
      <a [routerLink]="famille.id">
        <img [src]="famille.imgSrc" [alt]="famille.title"
        mat-card-image></a>
        <mat-card-title><a [routerLink]="famille.id">{{famille.title}}</a></mat-card-title>
      </mat-card>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamillesItemComponent {

  @Input() famille: Famille;

}
