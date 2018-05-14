import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchOffline } from '@ngx-pwa/offline';

import { Famille } from '../../shared/famille';
import { Produit } from '../../shared/produit';
import { PlateauxService } from '../../shared/plateaux.service';

@Component({
  template: `
    <div>
    <div *ngIf="famille$ | async as famille; else loading">
    <a routerLink="../../familles">Retour</a>
    <mat-toolbar><span>{{famille.title}}</span></mat-toolbar>
    </div>
    <ng-template #loading>
    <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
  </ng-template>
  <div>
  <plateauxapp-produits-list *ngIf="produits$ | async as produits; else produitsLoading"
  [produits]="produits"></plateauxapp-produits-list>
  <ng-template #produitsLoading>
    <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
  </ng-template>
</div>


    <ng-template #loading>
    <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
  </ng-template>
    </div>
  `
})
export class FamilleComponent implements OnInit {

  famille$:  Observable<Famille>;
  produits$:  Observable<Produit[]>;




  constructor(protected plateaux: PlateauxService, protected route: ActivatedRoute) { }

  ngOnInit() {

    this.famille$ =  this.route.paramMap.pipe(
      map((params) => Number.parseInt(params.get('id') || '1', 10)),
      switchMap((id) => this.plateaux.getFamille(id)),
      catchOffline());

    this.produits$ = this.route.paramMap.pipe(
      map((params) => Number.parseInt(params.get('id') || '1', 10)),
      switchMap((id) => this.plateaux.getProduitsByFamille(id)),
      catchOffline()
    );


  }

}
