import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule,  MatInputModule, MatCardModule, MatButtonModule, 
  MatProgressSpinnerModule, MatToolbarModule, MatSnackBarModule } from '@angular/material';

import { PlateauxRoutingModule } from './plateaux-routing.module';
import { SlideshowModule } from '../ui/slideshow';

import { ProduitsComponent } from './pages/produits/produits.component';
import { ProduitComponent } from './pages/produit/produit.component';
import { FamillesComponent } from './pages/familles/familles.component';
import { FamilleComponent } from './pages/famille/famille.component';
import { ProduitDetailsComponent } from './components/produit-details/produit-details.component';
import { ProduitsListComponent } from './components/produits-list/produits-list.component';
import { ProduitsItemComponent } from './components/produits-item/produits-item.component';
import { FamillesListComponent } from './components/familles-list/familles-list.component';
import { FamillesItemComponent } from './components/familles-item/familles-item.component';
import { FamilleProduitsComponent } from './components/famille-produits/famille-produits.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDialogModule,
    SlideshowModule,
    PlateauxRoutingModule,
    MatSnackBarModule
  ],
  declarations: [
    ProduitsComponent,
    ProduitComponent,
    FamillesComponent,
    FamilleComponent,
    ProduitDetailsComponent,
    ProduitsListComponent,
    ProduitsItemComponent,
    FamillesListComponent,
    FamillesItemComponent,
    FamilleProduitsComponent,
  ]
})
export class PlateauxModule {}
