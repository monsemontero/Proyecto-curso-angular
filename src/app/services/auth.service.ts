import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register.model';
import { Usuario } from '../models/usuario.model';
  
  const AUTH_USER = 'auth_user';
  const AUTH_TOKEN = 'auth_token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url =environment.apiUrl;
  private subjectUsuario= new BehaviorSubject<Usuario|null>(null);
  usuario$ :Observable<Usuario|null> = this.subjectUsuario.asObservable();
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  
  constructor(private http:HttpClient) { }

  register(registro:Register){
    return this.http.post(`${this.url}register`,registro)
  }
  login(credenciales:Register){
    return this.http.post<any>(`${this.url}login`,credenciales)
                        .pipe(
                          tap((response)=>{

                            const datosUsuario = response['user'] as Usuario;
                            const accessToken = response['accessToken'];

                            this.subjectUsuario.next(datosUsuario);

                            localStorage.setItem(AUTH_USER,JSON.stringify(datosUsuario));
                            localStorage.setItem(AUTH_TOKEN,accessToken);

                          }),
                          shareReplay()
                        );
  }
  logout(){
    this.subjectUsuario.next(null);
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_USER);
  }
}
