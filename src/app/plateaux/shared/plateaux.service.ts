import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Produit } from './produit';
import { Famille } from './famille';
import { Slide } from './slide';
import { Slide as SlideshowSlide } from '../../ui/slideshow';

@Injectable({
  providedIn: 'root'
})
export class PlateauxService {

  constructor(protected http: HttpClient) {}

  getProduits(): Observable<Produit[]> {

    return this.http.get<Produit[]>(`/api/plateaux/produits`);

  }

  getProduit(id: number): Observable<Produit> {

    return this.http.get<Produit>(`/api/plateaux/produit/${id}`).pipe(map((produit) => ({
      ...produit
    })));

  }

  getProduitsByFamille(id: number): Observable<Produit[]> {

    return this.http.get<Produit[]>(`/api/plateaux/produitsbyfamille/${id}`);

  }



  getFamilles(): Observable<Famille[]> {

    return this.http.get<Famille[]>(`/api/plateaux/familles`);

  }

  getFamille(id: number): Observable<Famille> {

    return this.http.get<Famille>(`/api/plateaux/famille/${id}`).pipe(map((famille) => ({
      ...famille
    })));

  }

  getSlides(): Observable<SlideshowSlide[]> {

    return this.http.get<Slide[]>(`/api/plateaux/slides`).pipe(map((slides) =>
      slides.map((slide) => ({ ...slide, link: `/plateaux/produits/${slide.produitId}` }))
    ));

  }


}
