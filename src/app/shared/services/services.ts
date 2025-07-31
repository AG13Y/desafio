import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Services {
  private apiUrl = 'http://localhost:3000/Dicionario';
  
  constructor(private http: HttpClient) {}

getDictionary(id: number): Observable<any> {
return this.http.get(`${this.apiUrl}/${id}`);
}

criarDictionary(dictionary: any): Observable<any> {
return this.http.post(this.apiUrl, dictionary);
}

atualizarDictionary(id: number, dictionary: any): Observable<any> {
return this.http.put(`${this.apiUrl}/${id}`, dictionary);
}

listarDictionarys(): Observable<any[]> {
return this.http.get<any[]>(this.apiUrl);
}
  
  }
