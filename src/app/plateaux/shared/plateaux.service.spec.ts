import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { PlateauxService } from './plateaux.service';
import { Produit } from './produit';

describe('PlateauxsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlateauxService]
    });
  });

  it('should be created', inject([PlateauxService], (service: PlateauxService) => {
    expect(service).toBeTruthy();
  }));

});
