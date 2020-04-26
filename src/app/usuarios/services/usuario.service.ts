import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';

import { Usuario } from '../models/usuario';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl: string = environment.apiUrl;

  private _usuariosSet: BehaviorSubject<Usuario[]>;
  private dataStore: {
    usuariosSet: Usuario[]
  };
  loaded = false;

  constructor(private http: HttpClient) {
    this.dataStore = { usuariosSet: [] };
    this._usuariosSet = new BehaviorSubject<Usuario[]>([]);
  }


  get usuariosSet(): Observable<Usuario[]> {
    return this._usuariosSet.asObservable();
  }

  getJSON(): Observable<Usuario[]> {
    if (!this.loaded) {
      this.http.get<Usuario[]>(`${this.apiUrl}/users`)
        .pipe(
          tap((usuario) => console.log(usuario)),
          delay(1000)
        )
        .subscribe(data => {
          this.dataStore.usuariosSet = data;
          this._usuariosSet.next(Object.assign({}, this.dataStore).usuariosSet);
        });
      this.loaded = true;
    }

    return this.usuariosSet;
  }

  public getData(route: string) {
    return this.http.get(this.createCompleteRoute(this.apiUrl, route));
  }

  usuarioById(id: number) {
    return this.dataStore.usuariosSet.find(x => x.id === id);
  }

  getUsuarioById(id: number) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }


  addusuario(usuario_params: Usuario): Observable<Usuario> {
    return this.http.post(`${this.apiUrl}/users`, usuario_params)
    .pipe(
      tap((usuario: Usuario) => {
        this.dataStore.usuariosSet.push(usuario);
        this._usuariosSet.next(Object.assign({}, this.dataStore).usuariosSet);
      })
    );
  }


  update(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/users/${user.id}`, user);
  }


  deleteUsuario(usuario_id) {
    return this.http.delete(`${this.apiUrl}/users/${usuario_id}`)
      .pipe(
        tap(() => {
          this.dataStore.usuariosSet.slice(usuario_id);
          this._usuariosSet.next(Object.assign({}, this.dataStore).usuariosSet);
        })
      );
  }


  private createCompleteRoute(envAddress: string, route: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }


}
