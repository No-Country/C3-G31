import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleosService {

  private api_empleos="http://127.0.0.1:5000/api/empleos";
  private empleo: string;
  private empleos: string;

  constructor(private http: HttpClient) { }


  public getAllEmpleos(): Observable<any>{
    return this.http.get(this.api_empleos);
  }
  



}
