import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  template: `
    <mat-card>
      <h1>Profil</h1>
      <button routerLink="../../admin" type="submit" mat-raised-button color="accent">Paramétrage</button>
      <p></p>
      <p><a routerLink="/account/logout">Se déconnecter</a></p>
    </mat-card>
  `
})
export class LogedComponent implements OnInit {



  constructor(
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar) { }

  ngOnInit() {


  }


}
