import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import * as $ from "jquery";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private pokeService: PokemonService, private element: ElementRef) { }

  lista_pokemon: Pokemon[] = [];
  offset_actual: number = 0;

  // ESTE BOOLEAN EVITABA QUE LA API SE LLAMARA MÁS DE UNA VEZ, LO TENÍA PARA EL SCROLL AUTOMÁTICO Y ME SACÓ CANAS
  started: boolean = false;
  @ViewChild('final') final: ElementRef;
  // @HostListener('document:scroll', ['$event']) onScrollEvent($event) {
  //   // const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   if ((window.innerHeight + document.documentElement.scrollTop) >= document.body.offsetHeight) {
  //     if (!this.started) {
  //       this.llegaAlFinal();
  //     }
  //   }
  // }


  ngOnInit(): void {
    this.cargarPrimeros12().then(offset => {
      this.cargarFotos(offset);
    })
  }

  cargarPrimeros12() {
    return new Promise(resolve => {
      this.pokeService.getPokemonFirstList().subscribe((data) => {
        // console.log(data.results);
        for (let key in data.results) {
          let id = data.results[key].url.split('/', 7)[6]
          let pokenuevo = new Pokemon();
          pokenuevo.id = id;
          pokenuevo.nombre = data.results[key].name;
          this.lista_pokemon.push(pokenuevo);
        }
        // console.log('pkmn en orden?', this.lista_pokemon);
        resolve(this.offset_actual);
        // console.log('offset inicial', this.offset_actual);

      })
    })
  }
  
  cargarFotos(offset) {
    for (let index = offset; index < (offset + 12); index++) {
      // console.log('index', index);

      if (this.offset_actual <= 151) {
        this.pokeService.getPokemon(this.lista_pokemon[index].id).subscribe((data) => {
          // console.log(data);
          this.lista_pokemon[index].tipos = data.types;
          this.lista_pokemon[index].url_foto = data.sprites.front_default;
        });
        this.offset_actual = index + 1;
      }
    }
    this.started = false;
    console.log('offset', this.offset_actual);
    // console.log('lista actualizada?', this.lista_pokemon);
  }

  llegaAlFinal() {
    this.started = true;
    // window.scroll(200, 0);
    Swal.fire({
      icon: 'info',
      text: 'Cargando ...',
      allowOutsideClick: false
    })
    Swal.showLoading();
    if (this.offset_actual <= 151) {
      console.log('offset a cargar', this.offset_actual);
      this.cargarPokemonOffset(this.offset_actual).then(offset => {
        this.cargarFotos(offset);
      })
    } else {
      Swal.close();
    }
  }

  cargarPokemonOffset(offset) {
    return new Promise(resolve => {
      this.pokeService.getPokemonListOffset(offset).subscribe((data) => {
        Swal.close();
        for (let key in data.results) {
          let id = data.results[key].url.split('/', 7)[6]
          let pokenuevo = new Pokemon();
          pokenuevo.id = id;
          pokenuevo.nombre = data.results[key].name;
          if (Number(id) <= 151)
            this.lista_pokemon.push(pokenuevo);
        }
        // console.log('arreglo continuado', this.lista_pokemon);
        resolve(this.offset_actual);
      })
    });
  }

}
