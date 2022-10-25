import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArtistaService } from './services/artista.service';
import { AuthService } from './services/auth.service';
import { ListaCancionesService } from './services/lista-canciones.service';
import {map, shareReplay } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CRUDMUSICA';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public authService:AuthService,
    private router:Router) {}

    logout(){
      this.authService.logout();
      this.router.navigateByUrl('/login')
    }
}
