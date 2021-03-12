import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private pokeService: PokemonService) { }

  random_pokemon: Pokemon = new Pokemon;
  intervalo: any;

  ngOnInit(): void {
    this.cargarPokemonRandom();
    this.intervalo = setInterval(() => { this.cargarPokemonRandom() }, 6000);
  }

  ngOnDestroy() {
    // Es MUY necesario destruir el intervalo al cambiar de ruta, para que la API no siga llamando pkmn random
    clearInterval(this.intervalo);
  }

  cargarPokemonRandom() {
    // Generar ID random, solo los primeros 151 pokémon
    let random_id = Math.round(Math.random() * 150) + 1;
    // console.log('valor random ->', random_id);

    this.pokeService.getPokemon(random_id).subscribe((data: any) => {
      // console.log(data);
      this.random_pokemon.id = data.id;
      this.random_pokemon.nombre = data.name;
      this.random_pokemon.tipos = data.types;
      this.random_pokemon.url_foto = data.sprites.front_default;
    })
    this.pokeService.getSpecies(random_id).subscribe((data: any) => {
      // console.log(data);
      this.random_pokemon.descripcion = data.flavor_text_entries[34].flavor_text;
      // console.log(this.random_pokemon);
    })
  }


}
