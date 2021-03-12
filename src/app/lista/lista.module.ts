import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { ListaRoutingModule } from './lista-routing.module';



@NgModule({
  declarations: [ListaComponent, PokemonComponent],
  imports: [
    CommonModule,
    ListaRoutingModule
  ]
})
export class ListaModule { }
