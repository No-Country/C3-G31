import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class PostulacionesService {

  private api_postulaciones="http://127.0.0.1:5000/api/postulaciones";
  
  private empleo: string;
  private empleos: string;

  constructor(
    private http: HttpClient,
    private servicioUsuario: UsuariosService
    
  ) { }
  
  public getAllPostulaciones(): Observable<any>{
    return this.http.get(this.api_postulaciones); 
  }

  public getPostulacionId(id:any): Observable<any>{
    return this.http.get(this.api_postulaciones+"/"+id); 
  }


  
  public postPostulacion(data: object) {
    return this.http.post(this.api_postulaciones, data);
  }







}
