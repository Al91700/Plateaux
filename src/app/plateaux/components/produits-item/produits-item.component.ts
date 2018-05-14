import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Produit } from '../../shared/produit';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { BookingService } from '../../../account/shared/booking.service';
import { PlateauxService } from '../../shared/plateaux.service';

@Component({
  selector: 'plateauxapp-produits-item',
  template: `
  <!--<div id="produit">-->
    <article>
      <mat-card>
      <form method="post" (ngSubmit)="addbook(produit.familleId, produit.title,produit.unite,produit.prixUnitaire)">
       <!--<a  (click)="book(produit.title,produit.unite,produit.prixUnitaire)"><img [src]="produit.logoSrc" [alt]="produit.title"
        mat-card-image></a>-->
        <mat-card-title><a 
        (click)="addbook(produit.familleId, produit.title,produit.unite,produit.prixUnitaire)">{{produit.title}}</a></mat-card-title>
        <p>Unité: {{produit.unite}}</p>
        <p>Prix: {{produit.prixUnitaire}} €</p>
        <mat-form-field>
        <input type="number" name="quantite" [(ngModel)]="quantite" matInput placeholder="Saisir la quantité">
        <mat-error>La quantité est obligatoire</mat-error>
      </mat-form-field>
      <button type="submit" mat-mini-fab>+</button>
      <!--<button type="submit" mat-raised-button color="accent">Ajouter au panier</button>-->
      </form>
      </mat-card>
    </article>
    <!--</div>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProduitsItemComponent {
  quantite = 1;
  @Input() produit: Produit;
 constructor(protected plateaux: PlateauxService, protected router: Router, 
  protected booking: BookingService, protected snackBar: MatSnackBar) {}

  addbook(familleId: number, title: string , unite: string, prixUnitaire: number) {
    this.book(familleId , title , unite, prixUnitaire, this.quantite);
  }

  async book(familleId: number, title: string , unite: string, prixUnitaire: number, quantite: number) {
    if (this.quantite !== 0) {
        let familleTitle = '';
        const y = await new Promise (resolve => {this.plateaux.getFamille(familleId).subscribe(
          (response) => {
            familleTitle = response.title; resolve(y);   }
        ); });

        const z = await new Promise (resolve => {this.booking.book(title, familleTitle, unite, prixUnitaire, quantite);resolve(z);});
        this.snackBar.open(`Ajouté au panier`, `OK`, { duration: 2000 });
      }
  }

  }


