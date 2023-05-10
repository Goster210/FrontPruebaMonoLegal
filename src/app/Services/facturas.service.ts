import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import {Observable} from 'rxjs';
import { Facturas } from '../Interfaces/facturas';


@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint+"Factura/"

  constructor(private http:HttpClient) { }


  getList():Observable<Facturas[]>{
    return this.http.get<Facturas[]>(`${this.apiUrl}`)
  }

  add(modelo:Facturas):Observable<Facturas>{
    return this.http.post<Facturas>(`${this.apiUrl}crear`,modelo);
  }

  update(codigoFactura:string, modelo:Facturas):Observable<Facturas>{
    return this.http.put<Facturas>(`${this.apiUrl}editar`,modelo);
  }

  delete(codigoFactura:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}eliminar/${codigoFactura}`);
  }



}
