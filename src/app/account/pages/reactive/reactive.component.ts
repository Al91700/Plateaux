import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AccountService } from '../../shared/account.service';
import { AutocompleteService } from '../../shared/autocomplete.service';

/**
 * @todo Add a reactive binding to form
 * @todo Add email, password and city components with form binding
 * @todo Add api bindings to email and city
 */
@Component({
  template: `
    <mat-card>
      <form method="post" (ngSubmit)="register()" [formGroup]="form">
        <h1>Inscription</h1>
        <p>Attention : il s'agit d'une app de test. E-mail et mot de passe seront
        visibles en clair par n'importe qui.</p>
        <plateauxapp-errors [errors]="errors"></plateauxapp-errors>
        <plateauxapp-email-with-validation [form]="form"></plateauxapp-email-with-validation>
        <plateauxapp-password-with-confirmation [form]="form"></plateauxapp-password-with-confirmation>
        <!--<plateauxapp-city-with-autocomplete [form]="form"></plateauxapp-city-with-autocomplete>-->
        <button type="submit" mat-raised-button color="accent">Valider l'inscription</button>
        <p class="center"><a routerLink="/account/login">Déjà inscrit/e ? Connectez-vous.</a></p>
      </form>
    </mat-card>
  `
})
export class ReactiveComponent implements AfterViewInit {

  form = this.formBuilder.group({
    email: ['', { validators: Validators.required }],
    password: this.formBuilder.group({
      password1: '',
      password2: ''
    })
  });

  /** @todo Api observables with manual this-binding */

  errors: string[] = [];

  constructor(
    protected account: AccountService,
    protected autocomplete: AutocompleteService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected changeDetector: ChangeDetectorRef,
    protected formBuilder: FormBuilder) {}

  ngAfterViewInit() {

    /** @todo Detect changes */


  }

  register() {

    const loading = this.snackBar.open(`Connexion en cours...`);

    this.account.register(this.form.value).subscribe((response) => {

      if (response.success) {

        this.snackBar.open(`Inscription réussie`, `OK`, { duration: 2000 });

        this.router.navigate(['/account/login'], { queryParamsHandling: 'preserve' });

      }

      this.errors = response.errors;

    }, () => {

      loading.dismiss();

      this.errors = [`Pas de connexion Internet`];

    });

  }

}
