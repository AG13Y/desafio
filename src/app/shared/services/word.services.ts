import { HttpClient } from '@angular/common/http';
import {inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/dicionario_texto';

  getDictionaryText(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  postDictionaryTexts(word: any): Observable<any> {
    return this.http.post(this.apiUrl, word);
  }

  putDictionaryTexts(id: string, word: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, word);
  }

  getDictionaryTexts(dicionarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?dicionarioId=${dicionarioId}&_sort=texto`);
  }

  deleteDictionaryTexts(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}