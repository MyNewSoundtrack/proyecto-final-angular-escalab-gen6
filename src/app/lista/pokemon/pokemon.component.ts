import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  public pokemon_a_mostrar: Pokemon = new Pokemon;

  constructor(private pokeService: PokemonService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.cargarPokemon(params.id);
      this.cargarMasInfo(params.id);
      console.log(this.pokemon_a_mostrar);
    })
  }

  ngOnInit(): void {
  }

  cargarPokemon(id_pkmn) {
    this.pokeService.getPokemon(id_pkmn).subscribe((data) => {
      // console.log(data);
      this.pokemon_a_mostrar.alto = data.height;
      this.pokemon_a_mostrar.base_hp = data.stats[0].base_stat;
      this.pokemon_a_mostrar.base_atk = data.stats[1].base_stat;
      this.pokemon_a_mostrar.base_def = data.stats[2].base_stat;
      this.pokemon_a_mostrar.base_spa = data.stats[3].base_stat;
      this.pokemon_a_mostrar.base_spd = data.stats[4].base_stat;
      this.pokemon_a_mostrar.base_spe = data.stats[5].base_stat;
      // this.pokemon_a_mostrar.descripcion = '';
      this.pokemon_a_mostrar.habilidades = data.abilities;
      this.pokemon_a_mostrar.id = data.id;
      this.pokemon_a_mostrar.nombre = data.name;
      this.pokemon_a_mostrar.peso = data.weight;
      this.pokemon_a_mostrar.tipos = data.types;
      this.pokemon_a_mostrar.url_foto = data.sprites.front_default;
      this.pokemon_a_mostrar.url_foto_bk = data.sprites.back_default;
      this.pokemon_a_mostrar.url_foto_shiny = data.sprites.front_shiny;
      this.pokemon_a_mostrar.url_foto_shiny_bk = data.sprites.back_shiny;
    })
  }

  cargarMasInfo(id_pkmn) {
    this.pokeService.getSpecies(id_pkmn).subscribe((data) => {
      // console.log(data);
      this.pokemon_a_mostrar.nombre_jp = data.names[9].name;
      this.pokemon_a_mostrar.descripcion = data.flavor_text_entries[26].flavor_text;
    })
  }

  claseBarraStat(stat) {

    if (stat <= 59) {
      return 'progress-bar bg-danger'
    }
    if (stat >= 60 && stat <= 79) {
      return 'progress-bar bg-warning'
    }
    if (stat >= 80) {
      return 'progress-bar bg-success'
    }
  }

  calcularAncho(stat) {
    return ((stat * 60) / 100);
  }

}
