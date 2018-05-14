import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../shared/admin.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'plateauxapp-add-produit',
  template: `
    <h2>Ajouter un produit</h2>
    <form method="post" [formGroup]="form" (ngSubmit)="addProduit()">
      <plateauxapp-produit-form [form]="form"></plateauxapp-produit-form>
      <button type="submit" mat-raised-button color="accent">Ajouter le produit</button>
    </form>
  `,
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {

  form = this.formBuilder.group({
    id: 0,
    title: '',
    unite: '',
    prixUnitaire: 0,
    familleId: 0,
  });

  constructor(protected formBuilder: FormBuilder, protected admin: AdminService,
    protected snackBar: MatSnackBar, protected router: Router) {}

  ngOnInit() {}

  addProduit() {

    this.admin.addProduit(this.form.value).subscribe((response) => {

      if (response.success) {

        this.snackBar.open(`Produit ajouté`, `OK`, { duration: 2000 });

        this.router.navigate(['/admin/produits']);

      }

    });

  }

}
