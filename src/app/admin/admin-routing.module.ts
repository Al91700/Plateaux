import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminProduitsComponent } from './pages/produits/produits.component';
import { AddProduitComponent } from './pages/add-produit/add-produit.component';
import { UpdateProduitComponent } from './pages/update-produit/update-produit.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'produit/add', component: AddProduitComponent },
    { path: 'produit/update/:id', component: UpdateProduitComponent },
    { path: 'produits', component: AdminProduitsComponent },
    { path: '', redirectTo: '/admin/produits' },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
