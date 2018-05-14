import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { switchMap, filter, debounceTime } from 'rxjs/operators';

import { AccountService } from '../../shared/account.service';
import { AutocompleteService } from '../../shared/autocomplete.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  template: `
    <mat-card>
      <form method="post" (ngSubmit)="register()" #registerControl="ngForm">
        <h1>Inscription</h1>
        <p>Attention : il s'agit d'une app de test. E-mail et mot de passe seront
        visibles en clair par n'importe qui.</p>
        <ul *ngIf="errors.length">
          <li *ngFor="let error of errors">{{error}}</li>
        </ul>
        <mat-form-field>
          <input type="email" name="email" [(ngModel)]="email" #emailControl="ngModel"
          matInput placeholder="Votre adresse e-mail" required autocomplete="email">
          <p [hidden]="emailControl.valid || emailControl.pristine">L'e-mail est obligatoire.</p>
        </mat-form-field>
        <mat-form-field>
          <input type="password" name="password" [(ngModel)]="password" matInput
          placeholder="Votre mot de passe" required autocomplete="off">
          <mat-error>Le mot de passe est obligatoire</mat-error>
        </mat-form-field>
        <div>
          <mat-checkbox name="conditions" required>
            J'accepte les conditions d'utilisation. *
          </mat-checkbox>
        </div>
        <button type="submit" mat-raised-button color="accent" [disabled]="registerControl.invalid">Valider l'inscription</button>
        <p class="center"><a routerLink="/account/login">Déjà inscrit/e ? Connectez-vous.</a></p>
      </form>
    </mat-card>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  email = '';
  password = '';
  cityControl = new FormControl('');
  errors: string[] = [];
  citySuggestions: string[] = [];
  citySub: Subscription;

  constructor(
    protected account: AccountService,
    protected autocomplete: AutocompleteService,
    protected router: Router,
    protected snackBar: MatSnackBar) {}

  ngOnInit() {

   this.citySub = (this.cityControl.valueChanges as Observable<string>).pipe(
      filter((value) => value.length > 2),
      debounceTime(500),
      switchMap((value) => this.autocomplete.getCitySuggestions(value))
    ).subscribe((suggestions) => {
      this.citySuggestions = suggestions;
    });

  }

  ngOnDestroy() {
    this.citySub.unsubscribe();
  }

  register() {

    const loading = this.snackBar.open(`Connexion en cours...`);

    this.account.register({ email: this.email, password: this.password }).subscribe((response) => {

      if (response.success) {

        this.snackBar.open(`Inscription réussie`, `OK`, { duration: 2000 });

        this.router.navigate(['/account/login'], { queryParamsHandling: 'preserve' });

      }

      this.errors = response.errors;

    }, () => {

      this.errors = [`Pas de connexion Internet`];

    }, () => {

      loading.dismiss();

    });

  }

}
