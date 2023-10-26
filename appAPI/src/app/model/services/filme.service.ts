import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export enum SearchTypes {
    all = '',
    movie = 'movie',
    serie = 'serie',
    episode = 'episode'
}
@Injectable({
    providedIn: 'root'
})

export class FilmeService {
    url = 'http://www.omdbapi.com/';
    apiKey = '1e264cf3';
    constructor(private http: HttpClient) { }
    getAll(title: string, type: SearchTypes): Observable<any> {
        return this.http.get(`${this.url}?s=${encodeURI(title)} &type=${type}&apiKey=${this.apiKey}`)
    }
    getById(id: any): Observable<any> {
        return this.http.get(`${this.url}?i=${id} &plot=full&apiKey=${this.apiKey}`)
    }
}
