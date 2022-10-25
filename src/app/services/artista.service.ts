import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artista } from '../models/artista.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {
  private url = environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<Artista[]>{
    return this.http.get<Artista[]>(`${this.url}artistas`)
  }
}
