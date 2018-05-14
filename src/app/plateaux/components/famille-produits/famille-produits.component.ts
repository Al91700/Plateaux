import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Produit } from '../../shared/produit';

@Component({
  selector: 'plateauxapp-famille-produits',
  template: `
  <div>
      <plateauxapp-produits-item *ngFor="let produit of produits" [produit]="produit">
      </plateauxapp-produits-item>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilleProduitsComponent {

  @Input() produits: Produit[];

}
