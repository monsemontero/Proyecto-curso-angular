import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
{
  path:'register',
  component:RegistroComponent
},
{
  path:'canciones',
  loadChildren:()=>
    import('./c-lista-canciones/c-lista-canciones.module')
      .then(m=>m.CListaCancionesModule)
},
{
  path:'',
  redirectTo:'canciones',
  pathMatch:'full'
},
{
  path:'artistas',
  loadChildren:()=>
    import('./c-lista-canciones/c-lista-canciones.module')
      .then(m=>m.CListaCancionesModule)
},
{
  path:'',
  redirectTo:'artistas',
  pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
