import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atributos2 } from './Alunos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  
  url = "http://localhost:3000/Atributos2"
  constructor(private http: HttpClient) { }

  getSupplier(): Observable<Atributos2[]> {
    return this.http.get<Atributos2[]>(this.url);
  }

  save(supplier: Atributos2): Observable<Atributos2>{
    return this.http.post<Atributos2>(this.url, supplier);
  }

  delete(supplier: Atributos2) : Observable<void>{
    return this.http.delete<void>(`${this.url}/${supplier.id}`);
  }

  edit(supplier: Atributos2) : Observable<Atributos2>{
    return this.http.put<Atributos2>(`${this.url}/${supplier.id}`, supplier);
  }

}
