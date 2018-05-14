import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Produit } from '../../shared/produit';

@Component({
  selector: 'plateauxapp-produits-list',
  template: `
    <div id="produits-list">
      <plateauxapp-produits-item *ngFor="let produit of produits" [produit]="produit"></plateauxapp-produits-item>
    </div>
  `,
  styleUrls: ['./produits-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProduitsListComponent {

  @Input() produits: Produit[];

}
