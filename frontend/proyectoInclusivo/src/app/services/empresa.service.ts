import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    
    private api_empresas = "http://127.0.0.1:5000/api/empresas";

    constructor(
        private http: HttpClient
    ) {}

    public getUsuarioEmpresa(idUsuario: number) {
        return this.http.get(this.api_empresas + '?user_id=' + idUsuario);
    }

    public postEmpresa(data: object) {
        return this.http.post(this.api_empresas, data);
    }

    public tieneEmpresa(): boolean{
        return sessionStorage.getItem('empresa') != null
    }
}
