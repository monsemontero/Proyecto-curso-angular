import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CListaCancionesRoutingModule } from './c-lista-canciones-routing.module';
import { ListadoArtistasComponent } from './listado-artistas/listado-artistas.component';
import { ListadoCancionesComponent } from './listado-canciones/listado-canciones.component';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarEditarCancionesComponent } from './agregar-editar-canciones/agregar-editar-canciones.component';
import { SharedModule } from '../shared/shared.module';
import { AgregarEditarArtistasComponent } from './agregar-editar-artistas/agregar-editar-artistas.component';


@NgModule({
  declarations: [
    ListadoArtistasComponent,
    ListadoCancionesComponent,
    AgregarEditarCancionesComponent,
    AgregarEditarArtistasComponent,
  ],
  imports: [
    CommonModule,
    CListaCancionesRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule,SharedModule
  ]
})
export class CListaCancionesModule { }
