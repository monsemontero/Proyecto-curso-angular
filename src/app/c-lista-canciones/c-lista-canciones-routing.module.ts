import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarArtistasComponent } from './agregar-editar-artistas/agregar-editar-artistas.component';
import { AgregarEditarCancionesComponent } from './agregar-editar-canciones/agregar-editar-canciones.component';
import { ListadoArtistasComponent } from './listado-artistas/listado-artistas.component';
import { ListadoCancionesComponent } from './listado-canciones/listado-canciones.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoCancionesComponent
  },
  {
    path:'',
    component:ListadoArtistasComponent
  },
  {
    path:':id',
    component:AgregarEditarCancionesComponent
  },
  {
    path:':id',
    component:AgregarEditarArtistasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CListaCancionesRoutingModule { }
