import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatInput } from '@angular/material';
import { Observable } from 'rxjs';

import { Panier } from '../../shared/panier';
import { BookingService } from '../../shared/booking.service';
import { filter, distinct } from 'rxjs/operators';
import { Famille } from '../../../plateaux/shared/famille';
import { PlateauxService } from '../../../plateaux/shared/plateaux.service';



@Component({
  template: `
    <mat-card>
      <h1>Votre panier</h1>
      <div *ngIf="paniers$ | async as paniers" >
      <div *ngIf="familles$ | async as familles">
      <div *ngFor="let famille of familles; index as j">
      <mat-card class="example-card">
        <mat-card-title>{{famille.title}}</mat-card-title>
        <div *ngFor="let panier of paniers; index as i">
          <div *ngIf="panier.familleTitle == famille.title">
          <ul>
          <li>Produit : {{panier.produitTitle}}</li>
          <li>Rayon : {{panier.familleTitle}}</li>
          <li>Unité : {{panier.unite}}</li>
          <li>Prix Unitaire : {{panier.prixUnitaire}} €</li>
          <li>Quantité : {{panier.quantite}}</li>
          <div>
          <li>Prix : {{panier.quantite*panier.prixUnitaire}} €</li>
          </div>
          </ul>
          <p><a (click)="cancel(i)">Annuler ce produit</a></p>
          </div>
        </div>

        <mat-card-subtitle>
        <p *ngIf="getSumSousPanier(famille.title) != 0">Sous Total</p>
        <p *ngIf="getSumSousPanier(famille.title) != 0">{{getSumSousPanier(famille.title)}} €</p>
        <p *ngIf="getSumSousPanier(famille.title) == 0">Aucun produit de ce rayon.</p>
        </mat-card-subtitle>
        </mat-card>
        <p></p>
      </div>
      <mat-card>
      <mat-card-title *ngIf="paniers.length">Total</mat-card-title>
        <p *ngIf="paniers.length">{{getSum()}} €</p>
        <p *ngIf="!paniers.length">Votre panier est vide.</p>
        </mat-card>
      </div>
      </div>
      <p *ngIf="bookingProgress">Panier en cours...</p>
      <!--<p><a routerLink="/account/logout">Se déconnecter</a></p>-->
    </mat-card>
  `
})
export class ProfileComponent implements OnInit {

  paniers$: Observable<Panier[]>;
  familles$: Observable<Famille[]>;
  paniers: Panier[];
  bookingProgress = false;

  constructor(
    protected booking: BookingService,
    protected plateaux: PlateauxService,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar) { }

  ngOnInit() {

    this.paniers$ = this.booking.paniers;

    this.familles$ = this.plateaux.getFamilles();


  }

  cancel(id: number) {

    this.booking.cancel(id);

  }

  transformArray(array: Array<any>, field: string) {
    if (array) {
      const groupedObj = array.reduce((prev, cur) => {
        if (!prev[cur[field]]) {
          prev[cur[field]] = [cur];
        } else {
          prev[cur[field]].push(cur);
        }
        return prev;
      }, {});
      return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
    }
    return [];
  }

  getSum(): number {
    let sum = 0;
    this.paniers$.subscribe((paniers) => {this.paniers = paniers; });
    for (let i = 0; i < this.paniers.length; i++) {
      sum += (this.paniers[i].prixUnitaire * this.paniers[i].quantite);
    }
    return sum;
  }

  getSumSousPanier(famille: string): number {
    let sum = 0;
    this.paniers$.subscribe((paniers) => {this.paniers = paniers; });
    for (let i = 0; i < this.paniers.length; i++) {
      if (this.paniers[i].familleTitle === famille) {
      sum += (this.paniers[i].prixUnitaire * this.paniers[i].quantite);
      }
    }
    return sum;
  }

}
