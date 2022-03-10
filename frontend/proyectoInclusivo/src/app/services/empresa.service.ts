import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    
    private api_empresas = "http://127.0.0.1:5000/api/empresas";
    private empresa:string;

    constructor(
        private http: HttpClient
    ) {}

    public tieneEmpresa() {
        return sessionStorage.getItem('empresa') != null;
    }
    
    public getEmpresaActual():string{
        return this.empresa
    }

    public setEmpresaActual(empresa: string){
        this.empresa = empresa
    }

    public postEmpresa(data: object) {
        return this.http.post(this.api_empresas, data);
    }

    public getEmpresaId(id:number){
        return this.http.get(this.api_empresas+"/"+id)
    }

    public getEmpresaAll(){
        return this.http.get(this.api_empresas)
    }

    public patchEmpresaId(id:number, data:any): Observable<any>{
        return this.http.patch(this.api_empresas+"/"+id, data);
    }
}
