import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from '../../shared/admin.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PlateauxService } from '../../../plateaux/shared/plateaux.service';


@Component({
  selector: 'plateauxapp-update-produit',
  template: `
    <h2>Modifier un produit</h2>
    <form method="post" *ngIf="form" [formGroup]="form" (ngSubmit)="updateProduit()">
      <plateauxapp-produit-form [form]="form"></plateauxapp-produit-form>
      <input type="hidden" formControlName="id">
      <button type="submit" mat-raised-button color="accent">Modifier le produit</button>
    </form>
  `,
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {

  form: FormGroup;

  constructor(protected formBuilder: FormBuilder, protected admin: AdminService,
    protected snackBar: MatSnackBar, protected router: Router, protected route: ActivatedRoute) {}

  ngOnInit() {

    const id = Number.parseInt(this.route.snapshot.paramMap.get('id') || '1');

    this.admin.getProduit(id).subscribe((produit) => {
      this.form = this.formBuilder.group({
        id: produit.id,
        title: produit.title,
        unite: produit.unite,
        prixUnitaire: produit.prixUnitaire,
        familleId: produit.familleId
      });
    });


  }

  updateProduit() {

    this.admin.updateProduit(this.form.value).subscribe((response) => {

      if (response.success) {

        this.snackBar.open(`Produit modifié`, `OK`, { duration: 2000 });

        this.router.navigate(['/admin/produits']);

      }

    });

  }

}
