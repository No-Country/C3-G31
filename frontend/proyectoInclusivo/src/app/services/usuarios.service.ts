import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api_usuarios="http://127.0.0.1:5000/api/users";

  constructor(private http: HttpClient) { }


  public getAllUsuarios(): Observable<any>{
    return this.http.get(this.api_usuarios);
  }
  
  public getUsuariosId(id:number): Observable<any>{
    return this.http.get(this.api_usuarios+"/"+id);
  }

  public verificarLogin(data:any): Observable<any>{
    
    return this.http.post(this.api_usuarios, data);
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
