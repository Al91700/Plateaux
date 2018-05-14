import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchOffline } from '@ngx-pwa/offline';

import { Produit } from '../../shared/produit';
import { PlateauxService } from '../../shared/plateaux.service';
import { Slide } from '../../../ui/slideshow';

@Component({
  template: `
    <div>
      <div>
        <mat-toolbar><span>Produits à la une</span></mat-toolbar>
        <plateauxapp-slideshow delay="3000" *ngIf="slides$ | async as slides; else slidesLoading">
          <plateauxapp-slide *ngFor="let slide of slides" [slide]="slide"></plateauxapp-slide>
        </plateauxapp-slideshow>
        <ng-template #slidesLoading>
          <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
        </ng-template>
      </div>
      <div>
        <mat-toolbar><span>Tous les produits</span></mat-toolbar>
        <plateauxapp-produits-list *ngIf="produits$ | async as produits; else produitsLoading"
        [produits]="produits"></plateauxapp-produits-list>
        <ng-template #produitsLoading>
          <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
        </ng-template>
      </div>
    </div>
  `
})
export class ProduitsComponent implements OnInit {

  produits$: Observable<Produit[]>;
  slides$: Observable<Slide[]>;

  constructor(protected plateaux: PlateauxService) { }

  ngOnInit() {

    this.produits$ = this.plateaux.getProduits().pipe(catchOffline());

    this.slides$ = this.plateaux.getSlides().pipe(catchOffline());

  }

}
