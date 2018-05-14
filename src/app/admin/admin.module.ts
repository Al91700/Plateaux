import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatTableModule, MatButtonModule, MatInputModule, MatSelectModule, MatSnackBarModule,
  MatCheckboxModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminProduitsComponent } from './pages/produits/produits.component';
import { AddProduitComponent } from './pages/add-produit/add-produit.component';
import { ProduitFormComponent } from './components/produit-form/produit-form.component';
import { UpdateProduitComponent } from './pages/update-produit/update-produit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatPaginatorModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, AdminProduitsComponent, AddProduitComponent, ProduitFormComponent, UpdateProduitComponent]
})
export class AdminModule {}
