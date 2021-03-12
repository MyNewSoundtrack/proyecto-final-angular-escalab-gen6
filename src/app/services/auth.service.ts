import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Endpoint para crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Endpoint para iniciar sesión
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url: string = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private api_key = 'AIzaSyD_MWyWPES8QfcXfRp02BlYp44IMgcvwuc';

  token_usuario: string = '';

  constructor(private http: HttpClient) { }

  registrarse(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(`${this.url}:signUp?key=${this.api_key}`, authData).pipe(
      map(respuesta => {
        this.guardarToken(respuesta['idToken']);
        return respuesta;
      })
    );
  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(`${this.url}:signInWithPassword?key=${this.api_key}`, authData).pipe(
      map(respuesta => {
        this.guardarToken(respuesta['idToken']);
        return respuesta;
      })
    );
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expira');
  }

  private guardarToken(idToken: string) {
    this.token_usuario = idToken;
    localStorage.setItem('token', idToken)

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('token_expira', hoy.getTime().toString());
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.token_usuario = localStorage.getItem('token');
    } else {
      this.token_usuario = '';
    }

    return this.token_usuario;
  }

  estaLogueado(): boolean {
    if (this.leerToken().length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('token_expira'));
    const expiraDate = new Date();

    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }

  }

}
