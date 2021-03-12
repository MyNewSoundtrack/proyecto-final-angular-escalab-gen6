import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { PokemonComponent } from './pokemon/pokemon.component';

const routes: Routes = [
    {
        path: '', children: [
            {
                path: 'pokemon-list', component: ListaComponent,
                children: [
                    { path: 'pokemon/:id', component: PokemonComponent }
                ]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListaRoutingModule { }