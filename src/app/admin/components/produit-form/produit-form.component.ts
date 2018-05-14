import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Famille } from '../../../plateaux/shared/famille';
import { PlateauxService } from '../../../plateaux/shared/plateaux.service';

import { catchOffline } from '@ngx-pwa/offline';

@Component({
  selector: 'plateauxapp-produit-form',
  template: `
    <div [formGroup]="form">
      <mat-form-field>
        <input type="text" matInput formControlName="title" placeholder="Titre">
      </mat-form-field>
      <mat-form-field>
        <input type="text" matInput formControlName="unite" placeholder="Unité">
      </mat-form-field>
      <mat-form-field>
        <input type="number" matInput formControlName="prixUnitaire" placeholder="Prix">
      </mat-form-field>
      <mat-form-field>
        <mat-select formControlName="familleId" placeholder="Rayon">
          <mat-option>Aucune</mat-option>
          <mat-option *ngFor='let famille of familles$ | async' [value]="famille.id">{{famille.title}}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./produit-form.component.css']
})
export class ProduitFormComponent implements OnInit {


  familles$: Observable<Famille[]>;
  @Input() form: FormGroup;

  constructor(protected plateaux: PlateauxService) { }

  ngOnInit() {

    this.familles$ = this.plateaux.getFamilles().pipe(catchOffline());
  }

}
