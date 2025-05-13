import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrazilianState, City } from './brasil-api.models';

@Injectable({
  providedIn: 'root'
})
export class BrazilApiService {

  baseURL: string = "https://brasilapi.com.br/api"

  constructor(private httpClient: HttpClient) { }

  listUfs(): Observable<BrazilianState[]> {
    const path: string = "/ibge/uf/v1";
    return this.httpClient.get<BrazilianState[]>(this.baseURL + path);
  }

  listCities(uf: string): Observable<City[]> {
    const path = `/ibge/municipios/v1/${uf}`;
    return this.httpClient.get<City[]>(this.baseURL + path);
  } 
}
