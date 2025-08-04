import { HttpClient } from '@angular/common/http';
import {inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  
  private apiUrl = 'http://localhost:3000/dicionario';

  private http = inject(HttpClient);

  constructor() { }

  getDictionary(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  postDictionary(dictionary: any): Observable<any> {
    return this.http.post(this.apiUrl, dictionary);
  }

  putDictionary(id: string, dictionary: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dictionary);
  }

  getDictionarys(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?_sort=nome`);
  }
  
  deleteDictionary(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
