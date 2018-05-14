import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsComponent } from './pages/produits/produits.component';
import { ProduitComponent } from './pages/produit/produit.component';
import { FamillesComponent } from './pages/familles/familles.component';
import { FamilleComponent } from './pages/famille/famille.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'produits/:id', component: FamilleComponent },
    { path: 'produits', component: FamillesComponent },
    { path: 'familles/:id', component: FamilleComponent },
    { path: 'familles', component: FamillesComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlateauxRoutingModule {}
