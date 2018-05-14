import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchOffline } from '@ngx-pwa/offline';

import { Produit } from '../../shared/produit';
import { PlateauxService } from '../../shared/plateaux.service';

/** @todo Manage loading */
@Component({
  template: `
    <div>
      <div *ngIf="produit$ | async as produit; else loading">
        <plateauxapp-produit-details [produit]="produit"></plateauxapp-produit-details>
      </div>
      <ng-template #loading>
        <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
      </ng-template>
    </div>
  `,
})
export class ProduitComponent implements OnInit {

  produit$: Observable<Produit>;

  constructor(protected plateaux: PlateauxService, protected route: ActivatedRoute) { }

  ngOnInit() {

    // const id = Number.parseInt(this.route.snapshot.paramMap.get('id') || '1');

    this.produit$ = this.route.paramMap.pipe(
      map((paramMap) => Number.parseInt(paramMap.get('id') || '1')),
      switchMap((id) => this.plateaux.getProduit(id)),
      catchOffline()
    );

  }

}
