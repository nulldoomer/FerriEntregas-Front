import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 10, offset: number = 0): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }
}
