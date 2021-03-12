import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // Endpoints
  pokemon: string = 'https://pokeapi.co/api/v2/pokemon/';
  species: string = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(private http: HttpClient) { }

  getPokemon(pokemon_id: number): Observable<any> {
    // Info de 1 Pokémon según su ID
    return this.http.get(`${this.pokemon}${pokemon_id}`);
  }

  getSpecies(pokemon_id: number): Observable<any> {
    // Info de la especie de un Pokémon según su ID
    return this.http.get(`${this.species}${pokemon_id}`);
  }

  getPokemonFirstList(): Observable<any> {
    // ?limit=151 para mostrar solo los primeros 151 (región de Kanto)
    return this.http.get(`${this.species}?limit=12`);
  }

  getPokemonListOffset(offset): Observable<any> {
    // ?limit=151 para mostrar solo los primeros 151 (región de Kanto)
    return this.http.get(`${this.species}?offset=${offset}&limit=12`);
  }
}
