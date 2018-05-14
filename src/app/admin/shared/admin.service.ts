import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Produit } from '../../plateaux/shared/produit';
import { AccountResponse } from '../../account/shared/account-response';
import { Famille } from '../../plateaux/shared/famille';
interface ProduitWithoutId extends Partial<Produit> {
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(protected http: HttpClient) {}

  getProduit(id: number) {

    return this.http.get<Produit>(`/api/plateaux/produit/${id}`);

  }

  getProduits() {
    return this.http.get<Produit[]>(`/api/plateaux/produits`);

  }

  addProduit(produit: ProduitWithoutId) {

    return this.http.put<AccountResponse>(`/api/admin/produit`, produit);

  }

  updateProduit(produit: Produit) {

    return this.http.post<AccountResponse>(`/api/admin/produit`, produit);

  }

  deleteProduits(ids: number[]) {

    return this.http.delete<AccountResponse>(`/api/admin/produits/${ids.join(',')}`);

  }

  reset() {

    return this.http.post(`/api/admin/reset`, '');

  }

}
