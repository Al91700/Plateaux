import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LocalStorage, JSONSchema } from '@ngx-pwa/local-storage';

import { Panier } from './panier';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  protected readonly localStorageKey = 'booking';
  protected readonly paniersSchema: JSONSchema = {
    items: {
      properties: {
        produitTitle: { type: 'string' },
        familleTitle: { type: 'string'},
        prixUnitaire: { type: 'number' },
        unite: { type: 'number' },
        quantite: { type: 'number' },
      },
      required: ['produitTitle', 'familleTitle', 'prixUnitaire', 'unite', 'quantite']
    }
  };
  protected paniersSubject = new BehaviorSubject<Panier[]>([]);

  get paniers() {
    return this.paniersSubject.asObservable();
  }



  constructor(protected http: HttpClient, protected localStorage: LocalStorage) {

    this.localStorage.getItem<Panier[]>(this.localStorageKey)
      .subscribe((paniers) => {

        this.paniersSubject.next(paniers || []);

      });

  }

  book(produitTitle: string, familleTitle: string, unite: string, prixUnitaire: number, quantite: number) {

    /*return this.http.post<Panier>(`/api/book`, { title, quantite, prixUnitaire })
    .pipe(tap((panier: Panier) => {*/
      const newPanier: Panier = {produitTitle: '',
      familleTitle: '',
      prixUnitaire: 0,
      unite: '',
      quantite: 0 };
      let newPaniers = this.paniersSubject.getValue();
      const oldquantite = newPaniers.filter(val => {
        return val.produitTitle === produitTitle;
      });
      newPaniers = newPaniers.filter(val => {
        return val.produitTitle !== produitTitle;
      });
      newPanier.prixUnitaire = prixUnitaire;
      newPanier.familleTitle = familleTitle;
      newPanier.produitTitle = produitTitle;
      newPanier.unite = unite;
      if (oldquantite.length === 0) {
        newPanier.quantite = quantite;
      } else {
        newPanier.quantite = quantite  + oldquantite[0].quantite;
      }

      newPaniers.push(newPanier);
      this.paniersSubject.next(newPaniers);
      this.localStorage.setItemSubscribe(this.localStorageKey, newPaniers);



  }

  cancel(id: number) {

    const newPaniers = this.paniersSubject.getValue();
    newPaniers.splice(id, 1);

    this.paniersSubject.next(newPaniers);

    this.localStorage.setItemSubscribe(this.localStorageKey, newPaniers);

  }

}
