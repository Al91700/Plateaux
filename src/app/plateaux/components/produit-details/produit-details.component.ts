import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Produit } from '../../shared/produit';

/** @todo Configure this component with OnPush change detection */
@Component({
  selector: 'plateauxapp-produit-details',
  template: `
    <article>
      <mat-card>
        <mat-card-title>{{produit.title}}</mat-card-title>
      </mat-card>
    </article>
  `
})
export class ProduitDetailsComponent {

  @Input() produit: Produit;

  constructor(public sanitizer: DomSanitizer) {}

}
