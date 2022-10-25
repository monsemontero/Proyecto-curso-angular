import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artista } from '../models/artista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaArtistasService {
  private url = environment.apiUrl;
  constructor(
    private http:HttpClient
  ) { }

  get():Observable<Artista[]>{
    return this.http.get<Artista[]>(`${this.url}artista`)
  }
  save(artista:Artista):Observable<any>{
    return this.http.post(`${this.url}artistas`,artista);
  }
  getById(id:number):Observable<Artista>{
    return this.http.get<Artista>(`${this.url}artistas/${id}`);
  }
  update(id:number,artista:Artista){
    return this.http.put(`${this.url}artistas/${id}`,artista);
  }
  delete(id:number){
    return this.http.delete(`${this.url}artistas/${id}`);
  }
}
