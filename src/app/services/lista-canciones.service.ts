import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListaCanciones } from '../models/lista-canciones.model';

@Injectable({
  providedIn: 'root'
})
export class ListaCancionesService {

  private url = environment.apiUrl;
  constructor(private http:HttpClient
    ) { }
    get():Observable<ListaCanciones[]>{
      return this.http.get<ListaCanciones[]>(`${this.url}listaCanciones`)
    }
    save(canciones:ListaCanciones):Observable<any>{
      return this.http.post(`${this.url}listaCanciones`,canciones);
    }
    getById(id:number):Observable<ListaCanciones>{
      return this.http.get<ListaCanciones>(`${this.url}listaCanciones/${id}`);
    }
    update(id:number,canciones:ListaCanciones){
      return this.http.put(`${this.url}listaCanciones/${id}`,canciones);
    }
    delete(id:number){
      return this.http.delete(`${this.url}listaCanciones/${id}`);
    }
}
