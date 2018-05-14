import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchOffline } from '@ngx-pwa/offline';

import { Famille } from '../../shared/famille';
import { PlateauxService } from '../../shared/plateaux.service';

@Component({
  template: `
    <div>
    <plateauxapp-familles-list *ngIf="familles$ | async as familles; else loading" [familles]="familles"></plateauxapp-familles-list>
      <ng-template #loading>
        <div class="center"><mat-progress-spinner mode="indeterminate" *ngIf="!familles"></mat-progress-spinner></div>
      </ng-template>
    </div>
  `
})
export class FamillesComponent implements OnInit {

  familles$: Observable<Famille[]>;

  constructor(protected plateaux: PlateauxService) { }

  ngOnInit() {

    this.familles$ = this.plateaux.getFamilles().pipe(catchOffline());

  }

}
