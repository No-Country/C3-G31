import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api_usuarios="http://127.0.0.1:5000/api/users";
  private usuario: string;

  constructor(private http: HttpClient) { }

  public getUsuarioActual(): string {
    return this.usuario;
  }

  public setUsuarioActual(usuario: string) {
    this.usuario = usuario;
  }


  public getAllUsuarios(): Observable<any>{
    return this.http.get(this.api_usuarios);
  }
  
  public getUsuariosId(id:number): Observable<any>{
    return this.http.get(this.api_usuarios+"/"+id);
  }

  public postUsuario(data:any): Observable<any>{
    return this.http.post(this.api_usuarios, data);
  }

  verificarLogin(data:any){
    return this.http.post(this.api_usuarios + "/token", data);
  }

  
  // public postEntidad(obj, entidad: string) {
  //   const token = localStorage.getItem('token');
  //   let header = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     'Authorization': 'Bearer ' + token
  //   });
  //   return this.http.post(this.api_usuarios + entidad, obj, { headers: header });
  // }

}
