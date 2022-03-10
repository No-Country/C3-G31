import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleosService {

  private api_empleos="http://127.0.0.1:5000/api/empleos";
  
  private empleo: string;
  private empleos: string;

  constructor(
    private http: HttpClient,
    private servicioUsuario: UsuariosService
  ) { }

  public getAllEmpleos(): Observable<any>{
    return this.http.get(this.api_empleos);
  }

  public getEmpleoId(id:any): Observable<any>{
    return this.http.get(this.api_empleos+"/"+id);
  }

  public postEmpleo(data: any) {
    return this.http.post(this.api_empleos, data);
  }

}
