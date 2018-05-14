import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import { Produit } from '../../../plateaux/shared/produit';
import { ProduitFamille } from '../../../plateaux/shared/produitFamille';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { PlateauxService } from '../../../plateaux/shared/plateaux.service';
import { Famille } from '../../../plateaux/shared/famille';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'plateauxapp-admin-produits',
  template: `
    <h2>Liste des produits</h2>
    <a mat-raised-button color="accent" routerLink="/admin/produit/add">Ajouter un produit</a>
    <a mat-raised-button color="accent" (click)="deleteProduits()">Supprimer</a>
    <!--<a mat-raised-button color="accent" (click)="reset()">Réinitialiser</a>-->
    <mat-table #table [dataSource]="dataSource" matSort matSortActive="title" matSortDirection="asc">
      <ng-container matColumnDef="select">
        <mat-header-cell *matHeaderCellDef>
          <mat-checkbox (change)="masterToggle()" [checked]="selection.hasValue() && isAllSelected"
          [indeterminate]="selection.hasValue() && !isAllSelected">
          </mat-checkbox>
        </mat-header-cell>
        <mat-cell *matCellDef="let row">
          <mat-checkbox (click)="$event.stopPropagation()" (change)="selection.toggle(row)" [checked]="selection.isSelected(row)">
          </mat-checkbox>
        </mat-cell>
      </ng-container>
      <ng-container matColumnDef="title">
        <mat-header-cell *matHeaderCellDef mat-sort-header>Titre</mat-header-cell>
        <mat-cell *matCellDef="let produit"><a [routerLink]="['/admin/produit/update/', produit.id]">{{produit.title}}</a></mat-cell>
      </ng-container>
      <ng-container matColumnDef="unite">
      <mat-header-cell *matHeaderCellDef>Unité</mat-header-cell>
        <mat-cell *matCellDef="let produit">{{produit.unite}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="prixUnitaire">
        <mat-header-cell *matHeaderCellDef>Prix</mat-header-cell>
        <mat-cell *matCellDef="let produit">{{produit.prixUnitaire}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="rayon" >
        <mat-header-cell *matHeaderCellDef mat-sort-header>Rayon</mat-header-cell>
        <mat-cell *matCellDef="let produit">{{produit.familleTitle}}</mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="columnsToDisplay"></mat-header-row>
      <mat-row *matRowDef="let produits; columns: columnsToDisplay" ></mat-row>
    </mat-table>
    <mat-paginator [pageSize]="10" [showFirstLastButtons]="true"></mat-paginator>
  `,
  styleUrls: ['./produits.component.css']
})
export class AdminProduitsComponent implements OnInit, AfterViewInit {
  famille$: Observable<Famille>;
  dataSource = new MatTableDataSource<ProduitFamille>([]);
  columnsToDisplay = ['select', 'title', 'unite', 'prixUnitaire', 'rayon'];
  selection = new SelectionModel<Produit>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  get isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }
  public familleTitle = '';

  // tslint:disable-next-line:max-line-length
  constructor(protected admin: AdminService, protected snackBar: MatSnackBar,
    protected router: Router, protected plateaux: PlateauxService) {}


  ngOnInit() {
    this.loadProduits();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

  }

  async loadProduits() {
    let test = 0;
    let prod: Produit[] = [];
  const prodFamille: ProduitFamille[] = [];

    const prodFam: ProduitFamille = {id: 0,
    prixUnitaire: 0,
    unite: '',
    title: '',
    familleTitle: '',
    familleId: 0,
   logoSrc: '' };
    let y = await new Promise (resolve => {this.admin.getProduits().subscribe((response) => {
      prod = response; resolve(y);   }
    ); });
    for (let i = 0; i < prod.length; i++) {
      test = i;
      prodFam.id = prod[i].id;
      prodFam.familleId = prod[i].familleId;
      prodFam.title = prod[i].title;
      prodFam.prixUnitaire = prod[i].prixUnitaire;
      prodFam.unite = prod[i].unite;
    y = await new Promise (resolve => {this.plateaux.getFamille(prod[i].familleId).subscribe((famille) => {
        this.familleTitle = famille.title; resolve(y);
      }); });
      prodFamille[i] = {id: prod[i].id,
        prixUnitaire: prod[i].prixUnitaire,
        unite: prod[i].unite,
        title: prod[i].title,
        familleTitle: this.familleTitle,
        familleId: prod[i].familleId,
       logoSrc: '' };

      this.dataSource.data = prodFamille;
    }
  }

  masterToggle() {
    this.isAllSelected ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  deleteProduits() {

    if (this.selection.selected.length > 0) {

      this.admin.deleteProduits(this.selection.selected.map((produit) => produit.id)).subscribe((response) => {

        if (response.success) {

          this.snackBar.open(`Produit(s) supprimé(s)`, `OK`, { duration: 2000 });

          this.loadProduits();

        }

      });

    }

  }


  reset() {

    this.admin.reset().subscribe();

    this.loadProduits();

  }

}
